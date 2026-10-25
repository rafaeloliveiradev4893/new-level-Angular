import { Component } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
