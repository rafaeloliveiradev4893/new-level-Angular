import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './services/user/users';
import { AuthService } from '@auth0/auth0-angular';
import { Layout } from './core/layout/layout';
import { XpNotification } from './components/xp-notification/xp-notification';
import { WelcomeModal } from './components/welcome-modal/welcome-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout, XpNotification, WelcomeModal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
private auth = inject(AuthService);
  private userService = inject(Users);

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.userService.saveUser().subscribe();
      }
    });
  }
}
