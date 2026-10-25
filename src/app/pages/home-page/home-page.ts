import { Component } from '@angular/core';
import { TaskList } from '../../components/task/task-list/task-list';
import { UserInfo } from '../../components/user/user-info/user-info';
import { EventsGraph } from '../../components/events/events-graph/events-graph';

@Component({
  selector: 'app-home-page',
  imports: [TaskList, EventsGraph, UserInfo],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
