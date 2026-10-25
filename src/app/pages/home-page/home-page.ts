import { Component } from '@angular/core';
import { TaskList } from '../../components/task/task-list/task-list';
import { UserInfo } from '../../components/user/user-info/user-info';
import { EventsList } from '../../components/events/events-list/events-list';

@Component({
  selector: 'app-home-page',
  imports: [TaskList, UserInfo, EventsList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
