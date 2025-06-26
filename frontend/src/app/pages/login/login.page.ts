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

  // --- ¡NUEVAS VARIABLES! ---
  showPassword = false;
  passwordToggleIcon = 'eye-off';
  // --------------------------

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // --- ¡NUEVO MÉTODO! ---
  togglePassword(): void {
    this.showPassword = !this.showPassword; // Cambia el estado (true/false)
    if (this.passwordToggleIcon === 'eye-off') {
      this.passwordToggleIcon = 'eye';
    } else {
      this.passwordToggleIcon = 'eye-off';
    }
  }
  // -----------------------

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      return alert('Por favor, ingresa usuario y contraseña.');
    }
    this.authService.login(this.loginData).subscribe({
      // ... la lógica del login se queda igual ...
    });
  }
}