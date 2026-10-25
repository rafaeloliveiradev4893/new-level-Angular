// models/task.ts
import { Category } from "../enums/category"
import { Difficulty } from "../enums/difficulty"
import { Subtask } from "./subtask-model"

export interface Task {
  id?: number,
  title: string,
  description: string | null,
  isCompleted: boolean,
  dueDate: string | null,        // LocalDate -> "YYYY-MM-DD"
  completedAt: string | null,    // LocalDateTime -> ISO string
  createdAt: string,
  updatedAt: string,
  category: Category,
  difficulty: Difficulty,
  subtasks: Subtask[],
  version: number
}
