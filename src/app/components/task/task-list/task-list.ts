import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiTask } from '../../../services/task/api-task';
import { Task } from '../../../model/task-model';
import { Category } from '../../../enums/category';
import { Difficulty } from '../../../enums/difficulty';
import { TaskCard } from '../task-card/task-card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

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

  tasks = signal<Task[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  taskFormOpen = signal(false);

  newTask = signal<Partial<Task>>({
    title: '',
    description: '',
    category: Category.Undefined,
    difficulty: Difficulty.Easy,
  });

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

  loadTasks(): void {
    this.loading.set(true);
    this.error.set(null);
    this.apiTask.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar tarefas');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  addTask(): void {
    const task = this.newTask();
    if (!task.title?.trim()) return;

    this.loading.set(true);
    this.apiTask.addTask(task).subscribe({
      next: (created) => {
        this.tasks.update((t) => [...t, created]);
        this.newTask.set({ title: '', description: '', category: Category.Undefined, difficulty: Difficulty.Easy });
        this.loading.set(false);
        this.closeTaskForm();
      },
      error: (err) => {
        this.error.set('Erro ao criar tarefa');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  toggleComplete(task: Task): void {
    this.apiTask.completTask(task.id!, task).subscribe({
      next: (updated) => {
        this.tasks.update((t) => t.map((tk) => (tk.id === updated.id ? updated : tk)));
      },
      error: (err) => {
        this.error.set('Erro ao atualizar tarefa');
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
        this.error.set('Erro ao deletar tarefa');
        console.error(err);
      },
    });
  }
}
