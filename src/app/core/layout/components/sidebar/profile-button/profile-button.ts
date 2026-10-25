import { Component, Input, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { LogoutButton } from '../../../../auth/logout-button/logout-button';
import { AuthButton } from '../../../../auth/auth-button/auth-button';

@Component({
  selector: 'app-profile-button',
  imports: [CommonModule, LogoutButton, AuthButton],
  templateUrl: './profile-button.html',
  styleUrl: './profile-button.scss',
})
export class ProfileButton {
  protected auth = inject(AuthService);
  @Input() compact = false;
}
