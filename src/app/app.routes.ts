import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { UserInfoPage } from './pages/user-info-page/user-info-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'user-info',
    component: UserInfoPage
  }
];
