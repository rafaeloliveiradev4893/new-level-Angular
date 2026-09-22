import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user-model';

@Injectable({
  providedIn: 'root',
})
export class ApiUsers {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8090/api/user';

  criar(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  atualizar(user: Partial<User>): Observable<User> {
    return this.http.put<User>(this.apiUrl, user);
  }

  excluir(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
