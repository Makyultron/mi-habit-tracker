import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList,
  IonItem, IonInput, IonButton, IonIcon // IonIcon estaba faltando aquí
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
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline'; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      console.error('Por favor, ingresa usuario y contraseña.');
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
      }
    });
  }
}
