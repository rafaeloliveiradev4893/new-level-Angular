import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SubtaskRequest,
  Task,
  TaskRequest,
  TaskUpdateRequest,
} from '../../model/task-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiTask {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/task`;

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(task: TaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  changeTask(id: number, task: TaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  updateTask(id: number, task: TaskUpdateRequest): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, task);
  }

  completeTask(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/done`, {});
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addSubtask(taskId: number, subtask: SubtaskRequest): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${taskId}/subtasks`, subtask);
  }

  updateSubtask(
    taskId: number,
    subtaskId: number,
    subtask: SubtaskRequest,
  ): Observable<Task> {
    return this.http.patch<Task>(
      `${this.apiUrl}/${taskId}/subtasks/${subtaskId}`,
      subtask,
    );
  }

  completeSubtask(taskId: number, subtaskId: number): Observable<Task> {
    return this.http.patch<Task>(
      `${this.apiUrl}/${taskId}/subtasks/${subtaskId}/done`,
      {},
    );
  }

  deleteSubtask(taskId: number, subtaskId: number): Observable<Task> {
    return this.http.delete<Task>(
      `${this.apiUrl}/${taskId}/subtasks/${subtaskId}`,
    );
  }
}
