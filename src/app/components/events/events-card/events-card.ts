import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Event as CalendarEvent } from '../../../model/event-model';
import {
  categoryLabel as getCategoryLabel,
  difficultyLabel as getDifficultyLabel,
} from '../../../utils/enum-labels';

@Component({
  selector: 'app-events-card',
  imports: [DatePipe],
  templateUrl: './events-card.html',
  styleUrl: './events-card.scss',
})
export class EventsCard {
  @Input({ required: true }) event!: CalendarEvent;
  @Output() editRequested = new EventEmitter<CalendarEvent>();
  @Output() completionRequested = new EventEmitter<CalendarEvent>();
  @Output() deletionRequested = new EventEmitter<number>();

  categoryLabel = getCategoryLabel;
  difficultyLabel = getDifficultyLabel;

  get timeRange(): string {
    const start = new Date(this.event.startDate);
    const end = new Date(this.event.endDate);
    const format = (date: Date) =>
      date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    return `${format(start)} – ${format(end)}`;
  }

  get eventDate(): string {
    return new Date(this.event.startDate).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  edit(): void {
    this.editRequested.emit(this.event);
  }

  complete(): void {
    if (!this.event.isCompleted) {
      this.completionRequested.emit(this.event);
    }
  }

  delete(): void {
    this.deletionRequested.emit(this.event.id);
  }
}
