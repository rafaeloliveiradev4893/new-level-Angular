import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideTrash2 } from '@ng-icons/lucide';
import { Task } from '../../../model/task-model';

export interface SubtaskAction {
  taskId: number;
  subtaskId: number;
}

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, NgIcon],
  providers: [provideIcons({ lucideCheck, lucideTrash2 })],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input({ required: true }) task!: Task;
  @Output() completionToggled = new EventEmitter<Task>();
  @Output() deletionRequested = new EventEmitter<number>();
  @Output() subtaskCompletionRequested = new EventEmitter<SubtaskAction>();
  @Output() subtaskDeletionRequested = new EventEmitter<SubtaskAction>();

  toggleCompletion(): void {
    if (!this.task.isCompleted) {
      this.completionToggled.emit(this.task);
    }
  }

  requestDeletion(): void {
    if (this.task.id !== undefined) {
      this.deletionRequested.emit(this.task.id);
    }
  }

  completeSubtask(subtaskId: number): void {
    this.subtaskCompletionRequested.emit({
      taskId: this.task.id,
      subtaskId,
    });
  }

  deleteSubtask(subtaskId: number): void {
    this.subtaskDeletionRequested.emit({
      taskId: this.task.id,
      subtaskId,
    });
  }
}
