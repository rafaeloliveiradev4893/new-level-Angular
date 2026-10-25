import { Category } from '../enums/category';
import { Difficulty } from '../enums/difficulty';

export interface Event {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  completedAt: string | null;
  actualStartAt: string | null;
  actualEndAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  difficulty: Difficulty;
}

export interface EventRequest {
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  category: Category;
  difficulty: Difficulty;
}

export type EventUpdateRequest = Partial<EventRequest>;
