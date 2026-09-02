import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-button',
  imports: [CommonModule],
  templateUrl: './profile-button.html',
  styleUrl: './profile-button.scss',
})
export class ProfileButton {
  protected readonly window = window;
  protected auth = inject(AuthService);
}
