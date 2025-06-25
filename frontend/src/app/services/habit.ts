import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  // ¡Recuerda poner la URL correcta de tu backend aquí!
  private backendUrl = 'https://URL-DE-TU-CODESPACE-3001.app.github.dev/api/habits';

  constructor(private http: HttpClient) { }

  // Método para obtener los hábitos del usuario
  getHabits(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    return this.http.get<any[]>(this.backendUrl, { headers });
  }

  // Método para crear un nuevo hábito
  addHabit(habitData: { name: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    return this.http.post(this.backendUrl, habitData, { headers });
  }
}