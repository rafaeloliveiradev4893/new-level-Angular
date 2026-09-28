import { Component, inject, input, OnInit } from '@angular/core';
import { User } from '../../../model/user-model';
import { Users } from '../../../services/user/users';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss',
})
export class UserInfo implements OnInit {
  user?: User;

  private apiUser = inject(Users);

  ngOnInit(): void {
    this.apiUser.getMe().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Erro ao buscar usuário:', error);
      }
    });
  }
}
