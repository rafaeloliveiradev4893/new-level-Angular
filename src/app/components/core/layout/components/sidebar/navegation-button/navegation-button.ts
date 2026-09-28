import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navegation-button',
  imports: [],
  templateUrl: './navegation-button.html',
  styleUrl: './navegation-button.scss',
})
export class NavegationButton {
  @Input() text: string = "";
  @Input() src = "";
  @Input() alt = "";
}
