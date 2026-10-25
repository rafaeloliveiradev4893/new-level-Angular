import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGraph } from './events-graph';

describe('EventsGraph', () => {
  let component: EventsGraph;
  let fixture: ComponentFixture<EventsGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsGraph],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
