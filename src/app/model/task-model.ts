import { Category } from '../enums/category';
import { Difficulty } from '../enums/difficulty';
import { Subtask } from './subtask-model';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  difficulty: Difficulty;
  isCompleted: boolean;
  subtasks: Subtask[];
}

export interface TaskRequest {
  title: string;
  description?: string | null;
  dueDate?: string | null;
  category: Category;
  difficulty: Difficulty;
  subtasks?: SubtaskRequest[];
}

export type TaskUpdateRequest = Partial<Omit<TaskRequest, 'subtasks'>>;

export interface SubtaskRequest {
  title: string;
}
