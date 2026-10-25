import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { UserInfoPage } from './pages/user-info-page/user-info-page';
import { TasksPage } from './pages/tasks-page/tasks-page';
import { EventosPage } from './pages/eventos-page/eventos-page';
import { ComingSoonPage } from './pages/coming-soon-page/coming-soon-page';

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
  },
  {
    path: 'Eventos',
    component: EventosPage
  },
  {
    path: 'Guilda',
    component: ComingSoonPage,
    data: { title: 'Guilda' }
  },
  {
    path: 'NPCs',
    component: ComingSoonPage,
    data: { title: 'NPCs' }
  },
  {
    path: 'Conquistas',
    component: ComingSoonPage,
    data: { title: 'Conquistas' }
  },
  {
    path: 'Loja',
    component: ComingSoonPage,
    data: { title: 'Loja' }
  },
  {
    path: 'Amigos',
    component: ComingSoonPage,
    data: { title: 'Amigos' }
  }
];
