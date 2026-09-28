import { Component } from '@angular/core';
import { Header } from '../../header/header/header';
import { Sidebar } from './components/sidebar/sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [Header, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
