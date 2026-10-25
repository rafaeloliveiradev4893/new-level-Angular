import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/user';

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  saveUser(): Observable<User> {
    return this.http.post<User>(this.apiUrl, null);
  }

  updateUser(): Observable<User> {
    return this.http.patch<User>(this.apiUrl, null);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
