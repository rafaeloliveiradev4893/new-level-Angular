import {
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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

@Component({
  selector: 'app-events-list',
  imports: [CommonModule, FormsModule, EventsCard],
  templateUrl: './events-list.html',
  styleUrl: './events-list.scss',
})
export class EventsList implements OnInit {
  private apiEvent = inject(ApiEvent);
  private dayRequestId = 0;

  selectedDate = signal(this.dateKey(new Date()));
  events = signal<CalendarEvent[]>([]);
  loading = signal(false);
  saving = signal(false);
  error = signal<string | null>(null);
  eventFormOpen = signal(false);
  editingEventId = signal<number | null>(null);
  eventForm = signal<EventRequest>(this.emptyEventForm());

  categories = Object.values(Category);
  difficulties = Object.values(Difficulty);

  get selectedDateLabel(): string {
    const [year, month, day] = this.selectedDate().split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  ngOnInit(): void {
    this.loadSelectedDay();
  }

  previousDay(): void {
    this.changeSelectedDay(-1);
  }

  nextDay(): void {
    this.changeSelectedDay(1);
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
          startDate: latestEvent.startDate.slice(0, 16),
          endDate: latestEvent.endDate.slice(0, 16),
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
        this.saving.set(false);
        this.eventFormOpen.set(false);
        this.setSelectedDate(savedEvent.startDate.slice(0, 10));
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
      next: () => {
        this.loadSelectedDay();
      },
      error: (err) => {
        this.error.set('Não foi possível concluir o evento.');
        console.error('Erro ao concluir evento:', err);
      },
    });
  }

  deleteEvent(id: number): void {
    this.apiEvent.deleteEvent(id).subscribe({
      next: () => {
        this.events.update((events) => events.filter((event) => event.id !== id));
      },
      error: (err) => {
        this.error.set('Não foi possível excluir o evento.');
        console.error('Erro ao excluir evento:', err);
      },
    });
  }

  loadSelectedDay(): void {
    const requestId = ++this.dayRequestId;
    const selectedDate = this.selectedDate();
    this.loading.set(true);
    this.error.set(null);
    this.apiEvent
      .getEventsByPeriod(
        `${selectedDate}T00:00:00`,
        `${selectedDate}T23:59:59`,
      )
      .subscribe({
        next: (events) => {
          if (requestId !== this.dayRequestId) return;
          this.events.set(
            events.filter(
              (event) =>
                event.startDate.slice(0, 10) <= selectedDate &&
                event.endDate.slice(0, 10) >= selectedDate,
            ),
          );
          this.loading.set(false);
        },
        error: (err) => {
          if (requestId !== this.dayRequestId) return;
          this.error.set('Não foi possível carregar os eventos deste dia.');
          this.loading.set(false);
          console.error('Erro ao carregar eventos do dia:', err);
        },
      });
  }

  private changeSelectedDay(offset: number): void {
    const [year, month, day] = this.selectedDate().split('-').map(Number);
    const date = new Date(year, month - 1, day + offset);
    this.setSelectedDate(this.dateKey(date));
  }

  private setSelectedDate(date: string): void {
    this.selectedDate.set(date);
    this.loadSelectedDay();
  }

  private emptyEventForm(date = this.dateKey(new Date())): EventRequest {
    return {
      title: '',
      description: '',
      startDate: `${date}T09:00`,
      endDate: `${date}T10:00`,
      category: Category.Undefined,
      difficulty: Difficulty.Easy,
    };
  }

  private dateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
