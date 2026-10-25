import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegation-button',
  imports: [],
  templateUrl: './navegation-button.html',
  styleUrl: './navegation-button.scss',
})
export class NavegationButton {
  private router = inject(Router);

  @Input() label = '';
  @Input() collapsed = false;
  @Input() route = '';
  @Output() selected = new EventEmitter<void>();

  navigate(): void {
    this.router.navigate([this.route]);
    this.selected.emit();
  }
}