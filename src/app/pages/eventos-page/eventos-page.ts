import { Component } from '@angular/core';
import { EventsGraph } from '../../components/events/events-graph/events-graph';

@Component({
  selector: 'app-eventos-page',
  imports: [EventsGraph],
  templateUrl: './eventos-page.html',
  styleUrl: './eventos-page.scss',
})
export class EventosPage {}
