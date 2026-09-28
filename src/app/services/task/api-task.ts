import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../model/task-model';

@Injectable({
  providedIn: 'root',
})
export class ApiTask {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8090/api/task'

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task>{
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(task: Partial<Task>):Observable<Task>{
    return this.http.post<Task>(this.apiUrl, task);
  }

  changeTask(task: Partial<Task>):Observable<Task>{
    return this.http.put<Task>(this.apiUrl, task);
  }

  completTask(id: number, task: Partial<Task>):Observable<Task>{
    return this.http.patch<Task>(`${this.apiUrl}/${id}/done`, task);
  }

  deleteTask(id: number):Observable<Task>{ 
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }
}
