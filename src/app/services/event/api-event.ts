import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Event,
  EventRequest,
  EventUpdateRequest,
} from '../../model/event-model';

@Injectable({
  providedIn: 'root',
})
export class ApiEvent {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/event';

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventsByPeriod(start: string, end: string): Observable<Event[]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<Event[]>(`${this.apiUrl}/period`, { params });
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  addEvent(event: EventRequest): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  changeEvent(id: number, event: EventRequest): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  updateEvent(id: number, event: EventUpdateRequest): Observable<Event> {
    return this.http.patch<Event>(`${this.apiUrl}/${id}`, event);
  }

  completeEvent(id: number): Observable<Event> {
    return this.http.patch<Event>(`${this.apiUrl}/${id}/done`, {});
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
