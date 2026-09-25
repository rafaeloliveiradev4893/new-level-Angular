import { Component } from '@angular/core';
import { AuthButton } from '../../auth/auth-button/auth-button';

@Component({
  selector: 'app-header',
  imports: [AuthButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
