import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Definimos aquí mismo la estructura de un Hábito para tener todo junto
export interface Habit {
  _id: string;
  name: string;
  completed: boolean;
  createdAt: Date;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private backendUrl = `${environment.apiUrl}/habits`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('x-auth-token', token || '');
  }

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.backendUrl, { headers: this.getHeaders() });
  }

  addHabit(habitData: { name: string }): Observable<Habit> {
    return this.http.post<Habit>(this.backendUrl, habitData, { headers: this.getHeaders() });
  }

  toggleHabitStatus(habitId: string): Observable<Habit> {
    return this.http.put<Habit>(`${this.backendUrl}/${habitId}`, {}, { headers: this.getHeaders() });
  }

  deleteHabit(habitId: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/${habitId}`, { headers: this.getHeaders() });
  }
}
