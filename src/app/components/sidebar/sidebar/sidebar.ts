import { Component } from '@angular/core';
import { NavegationButton } from "../navegation-button/navegation-button";
import { SettingsButton } from "../settings-button/settings-button";

@Component({
  selector: 'app-sidebar',
  imports: [NavegationButton, SettingsButton],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {}
