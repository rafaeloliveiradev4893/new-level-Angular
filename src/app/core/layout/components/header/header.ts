import { Component, OnInit, inject } from '@angular/core';
import { AuthButton } from '../../../auth/auth-button/auth-button';
import { User } from '../../../../model/user-model';
import { Users } from '../../../../services/user/users';

@Component({
  selector: 'app-header',
  imports: [AuthButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  private apiUser = inject(Users);

  userInf?: User;

  ngOnInit(): void {
    this.apiUser.getMe().subscribe({
      next: (user) => {
        this.userInf = user;
      },
      error: (error) => {
        console.error('Erro ao buscar usuário:', error);
      }
    });
  }
}
