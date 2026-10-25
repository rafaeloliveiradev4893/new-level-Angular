import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EventosPage } from './eventos-page';
import { ApiEvent } from '../../services/event/api-event';

describe('EventosPage', () => {
  let component: EventosPage;
  let fixture: ComponentFixture<EventosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosPage],
      providers: [
        {
          provide: ApiEvent,
          useValue: {
            getEventsByPeriod: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
