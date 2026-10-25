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
import type { Subtask } from '../../../model/subtask-model';
import {
  categoryLabel as getCategoryLabel,
  difficultyLabel as getDifficultyLabel,
} from '../../../utils/enum-labels';

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
  editingTaskId = signal<number | null>(null);
  editingSubtask = signal<{ taskId: number; subtaskId: number } | null>(null);
  subtaskEditTitle = signal('');
  subtaskEditError = signal<string | null>(null);
  savingSubtask = signal(false);

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
  categoryLabel = getCategoryLabel;
  difficultyLabel = getDifficultyLabel;

  ngOnInit(): void {
    this.loadTasks();
  }

  openTaskForm(): void {
    this.error.set(null);
    this.editingTaskId.set(null);
    this.resetTaskForm();
    this.taskFormOpen.set(true);
  }

  editTask(task: Task): void {
    this.error.set(null);
    this.editingTaskId.set(task.id);
    this.newTask.set({
      title: task.title,
      description: task.description ?? '',
      dueDate: task.dueDate,
      category: task.category,
      difficulty: task.difficulty,
    });
    this.subtaskTitles.set([]);
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

  saveTask(): void {
    const task = this.newTask();
    if (!task.title.trim()) return;

    const request: TaskRequest = {
      title: task.title.trim(),
      category: task.category,
      difficulty: task.difficulty,
      description: task.description?.trim() || null,
      dueDate: task.dueDate || null,
    };
    const subtasks = this.subtaskTitles()
      .map((title) => title.trim())
      .filter(Boolean);
    if (this.editingTaskId() === null && subtasks.length) {
      request.subtasks = subtasks.map((title) => ({ title }));
    }

    this.loading.set(true);
    const taskId = this.editingTaskId();
    const save$ =
      taskId === null
        ? this.apiTask.addTask(request)
        : this.apiTask.changeTask(taskId, request);
    save$.subscribe({
      next: (savedTask) => {
        if (taskId === null) {
          this.tasks.update((tasks) => [...tasks, savedTask]);
        } else {
          this.replaceTask(savedTask);
        }
        this.resetTaskForm();
        this.loading.set(false);
        this.closeTaskForm();
      },
      error: (err) => {
        this.error.set(
          getApiErrorMessage(
            err,
            taskId === null ? 'Erro ao criar tarefa.' : 'Erro ao editar tarefa.',
          ),
        );
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

  editSubtask(taskId: number, subtask: Subtask): void {
    this.subtaskEditError.set(null);
    this.subtaskEditTitle.set(subtask.title);
    this.editingSubtask.set({ taskId, subtaskId: subtask.id });
  }

  closeSubtaskEditor(): void {
    if (!this.savingSubtask()) {
      this.editingSubtask.set(null);
      this.subtaskEditError.set(null);
    }
  }

  saveSubtask(): void {
    const editing = this.editingSubtask();
    const title = this.subtaskEditTitle().trim();
    if (!editing || !title) return;

    this.savingSubtask.set(true);
    this.subtaskEditError.set(null);
    this.apiTask
      .updateSubtask(editing.taskId, editing.subtaskId, { title })
      .subscribe({
        next: (updated) => {
          this.replaceTask(updated);
          this.savingSubtask.set(false);
          this.editingSubtask.set(null);
        },
        error: (err) => {
          this.subtaskEditError.set(
            getApiErrorMessage(err, 'Erro ao editar subtarefa.'),
          );
          this.savingSubtask.set(false);
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
