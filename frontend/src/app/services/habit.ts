import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  // Reemplaza esta URL con la de tu puerto 3001
  private backendUrl = 'https://literate-couscous-q5pvqv5wjgh4px-3001.app.github.dev/api/habits';

  constructor(private http: HttpClient) { }

  getHabits(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    return this.http.get<any[]>(this.backendUrl, { headers });
  }

  addHabit(habitData: { name: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    return this.http.post(this.backendUrl, habitData, { headers });
  }
}