import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    // La ruta para nuestra página de login
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    // La ruta para nuestra página de registro
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    // Cuando un usuario abre la app en la raíz (''),
    // lo redirigimos automáticamente a la página de 'login'.
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];