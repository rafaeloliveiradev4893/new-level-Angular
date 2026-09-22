import { Category } from "../enums/category"
import { Difficulty } from "../enums/difficulty"

export interface Task {
  title: string,
  description: string | null,
  dueDate: string | null,
  completedAt: string | null,
  category: Category,
  difficulty: Difficulty
}
