import { Component, signal, HostListener } from '@angular/core';
import { NavegationButton } from "../navegation-button/navegation-button";
import { SettingsButton } from "../settings-button/settings-button";
import { ProfileButton } from "../profile-button/profile-button";

@Component({
  selector: 'app-sidebar',
  imports: [NavegationButton, SettingsButton, ProfileButton],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  isOpen = signal(false);
  isMobile = signal(false);

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }

  ngOnInit() {
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile.set(window.innerWidth <= 1024);
    if (!this.isMobile()) {
      this.isOpen.set(false);
    }
  }

  toggle() {
    this.isOpen.update(v => !v);
  }

  close() {
    this.isOpen.set(false);
  }
}
