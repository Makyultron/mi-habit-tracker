import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList,
  IonItem, IonInput, IonButton, IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, IonContent, IonHeader,
    IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonIcon
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerData = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.registerData.username || !this.registerData.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        console.log('Usuario registrado con éxito:', res);
        alert('¡Cuenta creada! Ahora serás redirigido para iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        alert(`Error: ${err.error.msg || 'El usuario ya existe o hubo un problema.'}`);
      }
    });
  }
}