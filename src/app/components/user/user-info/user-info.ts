import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../../model/user-model';
import { Users } from '../../../services/user/users';
import { getApiErrorMessage } from '../../../utils/api-error-message';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss',
})
export class UserInfo implements OnInit {
  private apiUser = inject(Users);

  attributes: { key: keyof User['atributos']; label: string }[] = [
    { key: 'forca', label: 'Força' },
    { key: 'destreza', label: 'Destreza' },
    { key: 'constituicao', label: 'Constituição' },
    { key: 'inteligencia', label: 'Inteligência' },
    { key: 'sabedoria', label: 'Sabedoria' },
    { key: 'carisma', label: 'Carisma' },
  ];

  user = signal<User | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.apiUser.getMe().subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(
          getApiErrorMessage(error, 'Não foi possível carregar as informações do perfil.'),
        );
        this.loading.set(false);
        console.error('Erro ao buscar usuário:', error);
      },
    });
  }
}
