import { Component, input, output } from '@angular/core';
import { AuthButton } from '../../../auth/auth-button/auth-button';

@Component({
  selector: 'app-header',
  imports: [AuthButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  sidebar = input.required<{ toggle: () => void; isOpen: () => boolean }>();
  menuToggle = output<void>();

  onMenuClick() {
    this.sidebar().toggle();
    this.menuToggle.emit();
  }
}
