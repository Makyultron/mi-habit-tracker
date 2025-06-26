import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitService } from '../services/habit';
import { HttpClientModule } from '@angular/common/http';

// Importamos TODAS las piezas de Ionic que usaremos en el HTML
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
  IonItemDivider // <-- La pieza que faltaba
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
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
    IonItemDivider // <-- Y la añadimos aquí
  ],
})
export class HomePage implements OnInit {
  habits: any[] = [];
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
        else { console.error('Error al cargar hábitos', err); }
      },
    });
  }

  addHabit() {
    if (!this.newHabitName.trim()) return;
    this.habitService.addHabit({ name: this.newHabitName }).subscribe({
      next: () => {
        this.loadHabits();
        this.newHabitName = '';
      },
      error: (err) => console.error('Error al añadir hábito', err),
    });
  }
}