import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitService, Habit } from '../services/habit'; // Importamos el servicio y la interfaz desde habit.ts
import { HttpClientModule } from '@angular/common/http';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonInput, IonButton, IonIcon, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonCheckbox, IonGrid, IonRow, IonCol,
  IonListHeader
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HttpClientModule, IonHeader, IonToolbar,
    IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton,
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCheckbox,
    IonGrid, IonRow, IonCol, IonListHeader
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  habits: Habit[] = [];
  newHabitName: string = '';

  constructor(private habitService: HabitService, private router: Router) {}

  ngOnInit() {
    this.loadHabits();
  }

  loadHabits() {
    this.habitService.getHabits().subscribe({
      next: (data) => { this.habits = data; },
      error: (err) => {
        if (err.status === 401) { this.router.navigate(['/login']); }
        else { console.error('Error al cargar hábitos:', err); }
      },
    });
  }

  addHabit() {
    if (!this.newHabitName.trim()) return;
    this.habitService.addHabit({ name: this.newHabitName }).subscribe({
      next: (newHabit) => {
        this.habits.unshift(newHabit);
        this.newHabitName = '';
      },
      error: (err) => console.error('Error al añadir hábito:', err),
    });
  }

  toggleComplete(habit: Habit, event: any) {
    // Actualizamos el estado visualmente de inmediato para una mejor experiencia
    habit.completed = event.detail.checked;
    this.habitService.toggleHabitStatus(habit._id).subscribe({
      error: err => {
        console.error('Error al actualizar el hábito', err);
        // Si hay un error, revertimos el cambio en la UI
        habit.completed = !habit.completed;
      }
    });
  }

  deleteHabit(habitToDelete: Habit, event: Event) {
    event.stopPropagation(); // Evita que el click se propague a otros elementos
    this.habitService.deleteHabit(habitToDelete._id).subscribe({
      next: () => {
        this.habits = this.habits.filter(h => h._id !== habitToDelete._id);
      },
      error: (err) => console.error('Error al eliminar hábito:', err),
    });
  }
}