import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideRotateCcw, lucideTrash2 } from '@ng-icons/lucide';
import { Task } from '../../../model/task-model';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, NgIcon],
  providers: [provideIcons({ lucideCheck, lucideRotateCcw, lucideTrash2 })],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input({ required: true }) task!: Task;
  @Output() completionToggled = new EventEmitter<Task>();
  @Output() deletionRequested = new EventEmitter<number>();

  toggleCompletion(): void {
    this.completionToggled.emit(this.task);
  }

  requestDeletion(): void {
    if (this.task.id !== undefined) {
      this.deletionRequested.emit(this.task.id);
    }
  }
}
