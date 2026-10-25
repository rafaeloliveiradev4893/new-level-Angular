import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EventsList } from './events-list';
import { ApiEvent } from '../../../services/event/api-event';

describe('EventsList', () => {
  let component: EventsList;
  let fixture: ComponentFixture<EventsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsList],
      providers: [
        {
          provide: ApiEvent,
          useValue: {
            getEventsByPeriod: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
