import { Component } from '@angular/core';
import { EventsGraph } from '../../components/events/events-graph/events-graph';
import { EventsList } from '../../components/events/events-list/events-list';

@Component({
  selector: 'app-eventos-page',
  imports: [EventsGraph, EventsList],
  templateUrl: './eventos-page.html',
  styleUrl: './eventos-page.scss',
})
export class EventosPage {}
