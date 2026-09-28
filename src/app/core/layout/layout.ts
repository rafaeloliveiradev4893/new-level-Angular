import { Component } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar/sidebar';
import { Header } from './components/header/header';

@Component({
  selector: 'app-layout',
  imports: [Header, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
