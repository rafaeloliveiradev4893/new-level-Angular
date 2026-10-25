import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../model/user-model';
import { Users } from '../../../services/user/users';

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

  user: User | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.apiUser.getMe().subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Não foi possível carregar as informações do perfil.';
        this.loading = false;
        console.error('Erro ao buscar usuário:', error);
      },
    });
  }
}
