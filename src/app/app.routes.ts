import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'tasks', loadComponent: () => import('./components/task-list/task-list').then(m => m.TaskList) },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];
