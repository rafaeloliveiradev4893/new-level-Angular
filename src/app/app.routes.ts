import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { UserInfoPage } from './pages/user-info-page/user-info-page';
import { TasksPage } from './pages/tasks-page/tasks-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'Estatisticas',
    component: UserInfoPage
  },
  {
    path: 'Tarefas',
    component: TasksPage
  }
];
