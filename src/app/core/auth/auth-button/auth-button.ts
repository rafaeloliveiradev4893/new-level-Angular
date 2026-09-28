import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  imports: [CommonModule],
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.scss',
})
export class AuthButton {
  protected auth = inject(AuthService);
}
