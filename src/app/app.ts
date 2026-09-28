import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/core/layout/components/sidebar/sidebar/sidebar";
import { Header } from "./components/header/header/header";
import { Users } from './services/users';
import { AuthService } from '@auth0/auth0-angular';
import { TaskList } from './components/task-list/task-list';
import { UserInfo } from './components/user/user-info/user-info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, TaskList, UserInfo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
private auth = inject(AuthService);
  private userService = inject(Users);

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.userService.saveUser().subscribe();
      }
    });
  }
}
