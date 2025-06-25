import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList,
  IonItem, IonInput, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, IonContent, IonHeader,
    IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonIcon
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      return alert('Por favor, ingresa usuario y contraseña.');
    }

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso, token recibido:', response.token);
        alert('¡Bienvenido!');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        alert('Error: Credenciales inválidas.');
      }
    });
  }
}