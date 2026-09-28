import { Component } from '@angular/core';
import { NavegationButton } from "../navegation-button/navegation-button";
import { SettingsButton } from "../settings-button/settings-button";
import { ProfileButton } from "../profile-button/profile-button";

@Component({
  selector: 'app-sidebar',
  imports: [NavegationButton, SettingsButton, ProfileButton],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {}
