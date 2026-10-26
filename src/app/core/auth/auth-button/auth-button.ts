import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { User } from '../../../model/user-model';
import { Users } from '../../../services/user/users';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-auth-button',
  imports: [CommonModule],
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.scss',
})
export class AuthButton implements OnInit {
  protected auth = inject(AuthService);
  private apiUser = inject(Users);

  userInf?: User;

  ngOnInit(): void {
    this.auth.isAuthenticated$
      .pipe(
        filter(Boolean),
        take(1),
        switchMap(() => this.apiUser.getMe()),
      )
      .subscribe({
        next: (user) => {
          this.userInf = user;
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
        },
      });
  }
}
