// models/subtask.ts
export interface Subtask {
  id?: number,
  title: string,
  isCompleted: boolean,
  completedAt: string | null,
  createdAt: string,
  updatedAt: string
}
