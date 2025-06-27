import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importamos la configuración del entorno

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  URL del archivo de entorno y le añadimos la ruta de autenticación
  private backendUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/register`, userData);
  }

  login(userData: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.backendUrl}/login`, userData);
  }
}
