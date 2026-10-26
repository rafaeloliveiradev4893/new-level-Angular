import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-welcome-modal',
  imports: [CommonModule],
  templateUrl: './welcome-modal.html',
  styleUrl: './welcome-modal.scss',
})
export class WelcomeModal {
  auth = inject(AuthService);
  termsAccepted = signal(
    typeof localStorage !== 'undefined' &&
      localStorage.getItem('new-level-terms-accepted-v1') === 'true',
  );

  acceptTerms(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    this.termsAccepted.set(target.checked);
    if (target.checked) {
      localStorage.setItem('new-level-terms-accepted-v1', 'true');
    } else {
      localStorage.removeItem('new-level-terms-accepted-v1');
    }
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  signUp(): void {
    this.auth.loginWithRedirect({
      authorizationParams: { screen_hint: 'signup' },
    });
  }
}
