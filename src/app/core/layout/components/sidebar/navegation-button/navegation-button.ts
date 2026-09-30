import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegation-button',
  imports: [],
  templateUrl: './navegation-button.html',
  styleUrl: './navegation-button.scss',
})
export class NavegationButton {

  private router = inject(Router);

  @Input() text: string = "";
  @Input() src = "";
  @Input() alt = "";
  @Input() route = "";

  navigate(): void {
    this.router.navigate([this.route]);
  }
}