import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCard } from './events-card';

describe('EventsCard', () => {
  let component: EventsCard;
  let fixture: ComponentFixture<EventsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('event', {
      id: 1,
      title: 'Evento teste',
      description: null,
      startDate: '2026-10-15T14:00:00',
      endDate: '2026-10-15T15:00:00',
      isCompleted: false,
      completedAt: null,
      actualStartAt: null,
      actualEndAt: null,
      createdAt: '2026-10-01T10:00:00',
      updatedAt: '2026-10-01T10:00:00',
      category: 'UNDEFINED',
      difficulty: 'EASY',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display category and difficulty in Portuguese', () => {
    fixture.detectChanges();
    const category = fixture.nativeElement.querySelector('.event-meta span');
    const difficulty = fixture.nativeElement.querySelectorAll('.event-meta span')[1];

    expect(category.textContent.trim()).toBe('Sem categoria');
    expect(difficulty.textContent.trim()).toBe('Fácil');
  });
});
