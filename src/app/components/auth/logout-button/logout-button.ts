import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  imports: [CommonModule],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
})
export class LogoutButton {
  protected readonly window = window;
  protected auth = inject(AuthService);

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: this.window.location.origin } });
  }
}