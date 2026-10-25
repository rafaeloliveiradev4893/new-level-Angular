import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiTask } from '../../../services/task/api-task';
import { Task, TaskRequest } from '../../../model/task-model';
import { Category } from '../../../enums/category';
import { Difficulty } from '../../../enums/difficulty';
import { TaskCard } from '../task-card/task-card';
import type { SubtaskAction } from '../task-card/task-card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { XpNotification } from '../../../services/xp-notification';
import { getApiErrorMessage } from '../../../utils/api-error-message';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule, TaskCard, NgIcon],
  providers: [
    provideIcons({
      lucidePlus
    })
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  private apiTask = inject(ApiTask);
  private xpNotification = inject(XpNotification);
  private pendingCompletionTaskIds = new Set<number>();

  tasks = signal<Task[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  taskFormOpen = signal(false);

  newTask = signal<TaskRequest>({
    title: '',
    description: '',
    dueDate: null,
    category: Category.Undefined,
    difficulty: Difficulty.Easy,
  });
  subtaskTitles = signal<string[]>([]);
  newSubtaskTitle = '';

  categories = Object.values(Category);
  difficulties = Object.values(Difficulty);

  ngOnInit(): void {
    this.loadTasks();
  }

  openTaskForm(): void {
    this.error.set(null);
    this.taskFormOpen.set(true);
  }

  closeTaskForm(): void {
    this.taskFormOpen.set(false);
  }

  addSubtaskField(): void {
    const title = this.newSubtaskTitle.trim();
    if (!title) return;

    this.subtaskTitles.update((titles) => [...titles, title]);
    this.newSubtaskTitle = '';
  }

  removeSubtaskField(index: number): void {
    this.subtaskTitles.update((titles) => titles.filter((_, i) => i !== index));
  }

  updateSubtaskTitle(index: number, title: string): void {
    this.subtaskTitles.update((titles) =>
      titles.map((current, i) => (i === index ? title : current)),
    );
  }

  loadTasks(): void {
    this.loading.set(true);
    this.error.set(null);
    this.apiTask.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err, 'Erro ao carregar tarefas.'));
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  addTask(): void {
    const task = this.newTask();
    if (!task.title.trim()) return;

    const description = task.description?.trim();
    const subtasks = this.subtaskTitles()
      .map((title) => title.trim())
      .filter(Boolean);
    const request: TaskRequest = {
      title: task.title.trim(),
      category: task.category,
      difficulty: task.difficulty,
      ...(description ? { description } : {}),
      ...(task.dueDate ? { dueDate: task.dueDate } : {}),
      ...(subtasks.length ? { subtasks: subtasks.map((title) => ({ title })) } : {}),
    };

    this.loading.set(true);
    this.apiTask.addTask(request).subscribe({
      next: (created) => {
        this.tasks.update((t) => [...t, created]);
        this.resetTaskForm();
        this.loading.set(false);
        this.closeTaskForm();
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err, 'Erro ao criar tarefa.'));
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  private resetTaskForm(): void {
    this.newTask.set({
      title: '',
      description: '',
      dueDate: null,
      category: Category.Undefined,
      difficulty: Difficulty.Easy,
    });
    this.subtaskTitles.set([]);
    this.newSubtaskTitle = '';
  }

  toggleComplete(task: Task): void {
    if (this.pendingCompletionTaskIds.has(task.id)) return;
    this.pendingCompletionTaskIds.add(task.id);
    this.apiTask.completeTask(task.id).subscribe({
      next: (updated) => {
        this.pendingCompletionTaskIds.delete(task.id);
        this.tasks.update((t) => t.map((tk) => (tk.id === updated.id ? updated : tk)));
        if (!task.isCompleted && updated.isCompleted) {
          this.xpNotification.show(task.category, task.difficulty);
        }
      },
      error: (err) => {
        this.pendingCompletionTaskIds.delete(task.id);
        this.error.set(getApiErrorMessage(err, 'Erro ao concluir tarefa.'));
        console.error(err);
      },
    });
  }

  deleteTask(id: number): void {
    this.apiTask.deleteTask(id).subscribe({
      next: () => {
        this.tasks.update((t) => t.filter((tk) => tk.id !== id));
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err, 'Erro ao excluir tarefa.'));
        console.error(err);
      },
    });
  }

  completeSubtask({ taskId, subtaskId }: SubtaskAction): void {
    if (this.pendingCompletionTaskIds.has(taskId)) return;
    this.pendingCompletionTaskIds.add(taskId);
    const taskBeforeCompletion = this.tasks().find((task) => task.id === taskId);
    this.apiTask.completeSubtask(taskId, subtaskId).subscribe({
      next: (updated) => {
        this.pendingCompletionTaskIds.delete(taskId);
        this.replaceTask(updated);
        if (
          taskBeforeCompletion &&
          !taskBeforeCompletion.isCompleted &&
          updated.isCompleted
        ) {
          this.xpNotification.show(
            taskBeforeCompletion.category,
            taskBeforeCompletion.difficulty,
          );
        }
      },
      error: (err) => {
        this.pendingCompletionTaskIds.delete(taskId);
        this.error.set(getApiErrorMessage(err, 'Erro ao concluir subtarefa.'));
        console.error(err);
      },
    });
  }

  deleteSubtask({ taskId, subtaskId }: SubtaskAction): void {
    this.apiTask.deleteSubtask(taskId, subtaskId).subscribe({
      next: (updated) => this.replaceTask(updated),
      error: (err) => {
        this.error.set(getApiErrorMessage(err, 'Erro ao remover subtarefa.'));
        console.error(err);
      },
    });
  }

  private replaceTask(updated: Task): void {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === updated.id ? updated : task)),
    );
  }
}
