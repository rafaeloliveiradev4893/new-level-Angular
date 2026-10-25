<<<<<<< HEAD
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavegationButton } from '../navegation-button/navegation-button';
import { ProfileButton } from '../profile-button/profile-button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendarDays,
  lucideChartNoAxesColumnIncreasing,
  lucideChevronLeft,
  lucideChevronRight,
  lucideLayoutDashboard,
  lucideListChecks,
  lucideMenu,
  lucideX,
} from '@ng-icons/lucide';
=======
import { Component, signal, HostListener } from '@angular/core';
import { NavegationButton } from "../navegation-button/navegation-button";
import { SettingsButton } from "../settings-button/settings-button";
import { ProfileButton } from "../profile-button/profile-button";
>>>>>>> aed1af736e66cff77b0ea1a7067bc664f3956b9d

@Component({
  selector: 'app-sidebar',
  imports: [NavegationButton, ProfileButton, NgIcon, RouterLink],
  providers: [
    provideIcons({
      lucideCalendarDays,
      lucideChartNoAxesColumnIncreasing,
      lucideChevronLeft,
      lucideChevronRight,
      lucideLayoutDashboard,
      lucideListChecks,
      lucideMenu,
      lucideX,
    }),
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
<<<<<<< HEAD
  isCollapsed = false;
  isMobileOpen = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileMenu(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMobileMenu(): void {
    this.isMobileOpen = false;
=======
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
>>>>>>> aed1af736e66cff77b0ea1a7067bc664f3956b9d
  }
}
