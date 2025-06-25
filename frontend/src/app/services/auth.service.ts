import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // La URL base de nuestro backend.
  // ¡Recuerda reemplazarla con la URL de tu puerto 3001 en Codespaces!
  private backendUrl = 'https://literate-couscous-q5pvqpv5wjgh4px-3001.app.github.dev/api/auth';

  constructor(private http: HttpClient) { }

  // Método para registrar un usuario
  // Llama a la ruta POST /register de nuestro backend
  register(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/register`, userData);
  }

  // Método para iniciar sesión
  // Llama a la ruta POST /login de nuestro backend
  login(userData: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.backendUrl}/login`, userData);
  }
}