import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'auth/login', loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'tasks', loadComponent: () => import('./features/tasks/pages/task-list/task-list.component').then(m => m.TaskListComponent) },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];
