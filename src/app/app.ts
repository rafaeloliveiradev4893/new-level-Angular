import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar/sidebar";
import { Header } from "./components/header/header/header";
import { Users } from './services/users';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
private auth = inject(AuthService);
  private userService = inject(Users);

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {

      if (isAuthenticated) {
        this.userService.getMe().subscribe({
          next: (response) => {
            console.log('Usuário:', response);
          },
          error: (error) => {
            console.error('Erro na API:', error);
          }
        });
      }

    });
  }
}
