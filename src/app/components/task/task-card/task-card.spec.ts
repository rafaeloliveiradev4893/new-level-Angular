import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCard } from './task-card';
import { Category } from '../../../enums/category';
import { Difficulty } from '../../../enums/difficulty';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    fixture.componentRef.setInput('task', {
      title: 'Test task',
      description: null,
      dueDate: null,
      completedAt: null,
      category: Category.Undefined,
      difficulty: Difficulty.Easy,
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
