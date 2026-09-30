import { Component, signal } from '@angular/core';
import { UserInfo } from '../../components/user/user-info/user-info';

@Component({
  selector: 'app-user-info-page',
  imports: [UserInfo],
  templateUrl: './user-info-page.html',
  styleUrl: './user-info-page.scss',
})
export class UserInfoPage {
}