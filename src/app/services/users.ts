import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user-model';

@Injectable({
  providedIn: 'root',
})
export class Users {

  private http = inject(HttpClient);

  getMe() {
    return this.http.get<User>('http://localhost:8090/api/user/me');
  }

  saveUser() {
    return this.http.post('http://localhost:8090/api/user', {})
  }

  updadeUser() {
    return this.http.put('http://localhost:8090/api/user', {})
  }

  deleteUser() {
    return this.http.delete('http://localhost:8090/api/user')
  }
}
