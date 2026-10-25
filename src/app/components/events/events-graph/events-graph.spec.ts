import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EventsGraph } from './events-graph';
import { ApiEvent } from '../../../services/event/api-event';

describe('EventsGraph', () => {
  let component: EventsGraph;
  let fixture: ComponentFixture<EventsGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsGraph],
      providers: [
        {
          provide: ApiEvent,
          useValue: {
            getEventsByPeriod: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
