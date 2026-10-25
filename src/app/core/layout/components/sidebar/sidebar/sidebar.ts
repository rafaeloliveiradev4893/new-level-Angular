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
  }
}
