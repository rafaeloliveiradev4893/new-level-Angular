import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navegation-button',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navegation-button.html',
  styleUrl: './navegation-button.scss',
})
export class NavegationButton {
  @Input() label = '';
  @Input() collapsed = false;
  @Input() route = '';
  @Output() selected = new EventEmitter<void>();

  navigate(): void {
    this.selected.emit();
  }
}