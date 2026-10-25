import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiEvent } from '../../../services/event/api-event';
import { Event as CalendarEvent } from '../../../model/event-model';
import { EventsList } from '../events-list/events-list';

interface CalendarDay {
  date: Date;
  key: string;
  inCurrentMonth: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-events-graph',
  imports: [CommonModule, EventsList],
  templateUrl: './events-graph.html',
  styleUrl: './events-graph.scss',
})
export class EventsGraph implements OnInit {
  private apiEvent = inject(ApiEvent);
  private periodRequestId = 0;

  events = signal<CalendarEvent[]>([]);
  visibleMonth = signal(this.firstOfMonth(new Date()));
  selectedDate = signal(this.dateKey(new Date()));
  loading = signal(false);
  error = signal<string | null>(null);
  eventsRefreshKey = signal(0);

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

  monthLabel = computed(() =>
    this.visibleMonth().toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    }),
  );

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
    this.selectDate(this.dateKey(today));
  }

  selectDate(key: string): void {
    this.selectedDate.set(key);

    const date = this.parseDateKey(key);
    if (!this.isSameMonth(date, this.visibleMonth())) {
      this.visibleMonth.set(this.firstOfMonth(date));
      this.loadVisiblePeriod();
    }
  }

  onEventsChanged(): void {
    this.eventsRefreshKey.update((key) => key + 1);
    this.loadVisiblePeriod();
  }

  loadVisiblePeriod(): void {
    const requestId = ++this.periodRequestId;
    const days = this.calendarDays();
    const first = days[0].date;
    const last = days[days.length - 1].date;
    this.loading.set(true);
    this.error.set(null);

    this.apiEvent
      .getEventsByPeriod(
        `${this.dateKey(first)}T00:00:00`,
        `${this.dateKey(last)}T23:59:59`,
      )
      .subscribe({
        next: (events) => {
          if (requestId !== this.periodRequestId) return;
          this.events.set(events);
          this.loading.set(false);
        },
        error: (err) => {
          if (requestId !== this.periodRequestId) return;
          this.error.set('Não foi possível carregar os eventos deste período.');
          this.loading.set(false);
          console.error('Erro ao carregar eventos:', err);
        },
      });
  }

  isToday(key: string): boolean {
    return key === this.dateKey(new Date());
  }

  formatEventTime(value: string): string {
    return new Date(value).toLocaleTimeString('pt-BR', {
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
    this.selectDate(this.dateKey(newSelected));
    this.loadVisiblePeriod();
  }

  private eventOverlapsDay(event: CalendarEvent, day: string): boolean {
    return (
      event.startDate.slice(0, 10) <= day &&
      event.endDate.slice(0, 10) >= day
    );
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

  private isSameMonth(first: Date, second: Date): boolean {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth()
    );
  }
}
