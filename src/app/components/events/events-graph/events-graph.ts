import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiEvent } from '../../../services/event/api-event';
import {
  Event as CalendarEvent,
  EventRequest,
} from '../../../model/event-model';
import { Category } from '../../../enums/category';
import { Difficulty } from '../../../enums/difficulty';
import { EventsCard } from '../events-card/events-card';

interface CalendarDay {
  date: Date;
  key: string;
  inCurrentMonth: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-events-graph',
  imports: [CommonModule, FormsModule, EventsCard],
  templateUrl: './events-graph.html',
  styleUrl: './events-graph.scss',
})
export class EventsGraph implements OnInit {
  private apiEvent = inject(ApiEvent);

  events = signal<CalendarEvent[]>([]);
  visibleMonth = signal(this.firstOfMonth(new Date()));
  selectedDate = signal(this.dateKey(new Date()));
  loading = signal(false);
  saving = signal(false);
  error = signal<string | null>(null);
  eventFormOpen = signal(false);
  editingEventId = signal<number | null>(null);
  eventForm = signal<EventRequest>(this.emptyEventForm());

  categories = Object.values(Category);
  difficulties = Object.values(Difficulty);
  weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  calendarDays = computed(() => {
    const month = this.visibleMonth();
    const firstDay = this.firstOfMonth(month);
    const mondayOffset = (firstDay.getDay() + 6) % 7;
    const start = new Date(firstDay);
    start.setDate(firstDay.getDate() - mondayOffset);
    const events = this.events();

    return Array.from({ length: 42 }, (_, index): CalendarDay => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const key = this.dateKey(date);
      return {
        date,
        key,
        inCurrentMonth: date.getMonth() === month.getMonth(),
        events: events.filter((event) => this.eventOverlapsDay(event, key)),
      };
    });
  });

  selectedEvents = computed(
    () =>
      this.calendarDays().find((day) => day.key === this.selectedDate())?.events ??
      [],
  );

  monthLabel = computed(() =>
    this.visibleMonth().toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    }),
  );

  selectedDateLabel = computed(() => {
    const date = this.parseDateKey(this.selectedDate());
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  });

  ngOnInit(): void {
    this.loadVisiblePeriod();
  }

  previousMonth(): void {
    this.changeMonth(-1);
  }

  nextMonth(): void {
    this.changeMonth(1);
  }

  goToToday(): void {
    const today = new Date();
    this.visibleMonth.set(this.firstOfMonth(today));
    this.selectedDate.set(this.dateKey(today));
    this.loadVisiblePeriod();
  }

  selectDate(key: string): void {
    this.selectedDate.set(key);
  }

  loadVisiblePeriod(): void {
    const first = this.calendarDays()[0].date;
    const last = this.calendarDays()[41].date;
    this.loading.set(true);
    this.error.set(null);

    this.apiEvent
      .getEventsByPeriod(
        `${this.dateKey(first)}T00:00:00`,
        `${this.dateKey(last)}T23:59:59`,
      )
      .subscribe({
        next: (events) => {
          this.events.set(events);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Não foi possível carregar os eventos deste período.');
          this.loading.set(false);
          console.error('Erro ao carregar eventos:', err);
        },
      });
  }

  openCreateForm(): void {
    this.error.set(null);
    this.editingEventId.set(null);
    this.eventForm.set(this.emptyEventForm(this.selectedDate()));
    this.eventFormOpen.set(true);
  }

  editEvent(event: CalendarEvent): void {
    this.error.set(null);
    this.saving.set(true);
    this.apiEvent.getEventById(event.id).subscribe({
      next: (latestEvent) => {
        this.editingEventId.set(latestEvent.id);
        this.eventForm.set({
          title: latestEvent.title,
          description: latestEvent.description ?? '',
          startDate: latestEvent.startDate,
          endDate: latestEvent.endDate,
          category: latestEvent.category,
          difficulty: latestEvent.difficulty,
        });
        this.eventFormOpen.set(true);
        this.saving.set(false);
      },
      error: (err) => {
        this.error.set('Não foi possível carregar o evento para edição.');
        this.saving.set(false);
        console.error('Erro ao buscar evento:', err);
      },
    });
  }

  closeForm(): void {
    if (!this.saving()) {
      this.eventFormOpen.set(false);
    }
  }

  saveEvent(): void {
    const form = this.eventForm();
    const request: EventRequest = {
      title: form.title.trim(),
      description: form.description?.trim() || null,
      startDate: form.startDate,
      endDate: form.endDate,
      category: form.category,
      difficulty: form.difficulty,
    };

    if (
      !request.title ||
      !request.startDate ||
      !request.endDate ||
      request.endDate <= request.startDate
    ) {
      this.error.set('Informe título, início e término válidos para o evento.');
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    const eventId = this.editingEventId();
    const save$ =
      eventId === null
        ? this.apiEvent.addEvent(request)
        : this.apiEvent.changeEvent(eventId, request);

    save$.subscribe({
      next: (savedEvent) => {
        this.upsertEvent(savedEvent);
        this.saving.set(false);
        this.eventFormOpen.set(false);
        const eventDate = this.dateKeyFromDateTime(savedEvent.startDate);
        const eventDateValue = this.parseDateKey(eventDate);
        if (
          eventDateValue.getFullYear() !== this.visibleMonth().getFullYear() ||
          eventDateValue.getMonth() !== this.visibleMonth().getMonth()
        ) {
          this.visibleMonth.set(this.firstOfMonth(eventDateValue));
          this.loadVisiblePeriod();
        }
        this.selectedDate.set(eventDate);
      },
      error: (err) => {
        this.error.set('Não foi possível salvar o evento.');
        this.saving.set(false);
        console.error('Erro ao salvar evento:', err);
      },
    });
  }

  completeEvent(event: CalendarEvent): void {
    this.apiEvent.completeEvent(event.id).subscribe({
      next: (updated) => this.upsertEvent(updated),
      error: (err) => {
        this.error.set('Não foi possível concluir o evento.');
        console.error('Erro ao concluir evento:', err);
      },
    });
  }

  deleteEvent(id: number): void {
    this.apiEvent.deleteEvent(id).subscribe({
      next: () => this.events.update((events) => events.filter((event) => event.id !== id)),
      error: (err) => {
        this.error.set('Não foi possível excluir o evento.');
        console.error('Erro ao excluir evento:', err);
      },
    });
  }

  isToday(key: string): boolean {
    return key === this.dateKey(new Date());
  }

  formatEventTime(value: string): string {
    const date = new Date(value);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private changeMonth(offset: number): void {
    const month = this.visibleMonth();
    const targetMonth = new Date(month.getFullYear(), month.getMonth() + offset, 1);
    this.visibleMonth.set(targetMonth);
    const selected = this.parseDateKey(this.selectedDate());
    const day = Math.min(selected.getDate(), this.daysInMonth(targetMonth));
    const newSelected = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), day);
    this.selectedDate.set(this.dateKey(newSelected));
    this.loadVisiblePeriod();
  }

  private upsertEvent(event: CalendarEvent): void {
    this.events.update((events) => {
      const existingIndex = events.findIndex((current) => current.id === event.id);
      if (existingIndex < 0) {
        return [...events, event];
      }
      return events.map((current) => (current.id === event.id ? event : current));
    });
  }

  private eventOverlapsDay(event: CalendarEvent, day: string): boolean {
    return (
      this.dateKeyFromDateTime(event.startDate) <= day &&
      this.dateKeyFromDateTime(event.endDate) >= day
    );
  }

  private emptyEventForm(date = this.dateKey(new Date())): EventRequest {
    const startDate = `${date}T09:00`;
    return {
      title: '',
      description: '',
      startDate,
      endDate: `${date}T10:00`,
      category: Category.Undefined,
      difficulty: Difficulty.Easy,
    };
  }

  private dateKeyFromDateTime(value: string): string {
    return value.slice(0, 10);
  }

  private dateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private parseDateKey(key: string): Date {
    const [year, month, day] = key.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private firstOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private daysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }
}
