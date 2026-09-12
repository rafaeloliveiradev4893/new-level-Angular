import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Users {

  private http = inject(HttpClient);

  getMe() {
    return this.http.get('http://localhost:8090/api/user/me');
  }
}
