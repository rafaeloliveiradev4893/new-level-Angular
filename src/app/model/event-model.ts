// models/event.ts
import { Category } from "../enums/category"
import { Difficulty } from "../enums/difficulty"

export interface Event {
  id?: number,
  title: string,
  description: string | null,
  isCompleted: boolean,
  startDate: string,
  endDate: string,
  completedAt: string | null,
  actualStartAt: string | null,
  actualEndAt: string | null,
  createdAt: string,
  updatedAt: string,
  category: Category,
  difficulty: Difficulty,
  version: number
}
