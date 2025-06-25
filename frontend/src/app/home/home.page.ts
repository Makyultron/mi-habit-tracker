import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitService } from '../services/habit'; // <-- RUTA CORREGIDA

// Importamos las piezas de Ionic que usaremos en el HTML
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  // Añadimos los componentes de Ionic a la lista de imports
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
  ],
})
export class HomePage implements OnInit {
  habits: any[] = [];
  newHabitName: string = '';

  constructor(private habitService: HabitService) {}

  ngOnInit() {
    this.loadHabits();
  }

  loadHabits() {
    this.habitService.getHabits().subscribe({
      next: (data) => {
        this.habits = data;
        console.log('Hábitos cargados:', this.habits);
      },
      error: (err) => console.error('Error al cargar hábitos', err),
    });
  }

  addHabit() {
    if (!this.newHabitName.trim()) return; // No añadir si está vacío
    this.habitService.addHabit({ name: this.newHabitName }).subscribe({
      next: () => {
        this.loadHabits(); // Recargamos la lista
        this.newHabitName = ''; // Limpiamos el campo
      },
      error: (err) => console.error('Error al añadir hábito', err),
    });
  }
}