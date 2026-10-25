import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { TaskCard } from './task-card';
import { Category } from '../../../enums/category';
import { Difficulty } from '../../../enums/difficulty';
import { Task } from '../../../model/task-model';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;
  let task: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    task = {
      id: 1,
      title: 'Test task',
      description: null,
      dueDate: null,
      completedAt: null,
      createdAt: '2026-10-25T10:00:00',
      updatedAt: '2026-10-25T10:00:00',
      category: Category.Undefined,
      difficulty: Difficulty.Easy,
      isCompleted: false,
      subtasks: [
        {
          id: 2,
          title: 'Test subtask',
          isCompleted: false,
          completedAt: null,
        },
      ],
    };
    fixture.componentRef.setInput('task', task);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a task edit request from the edit button', () => {
    const editRequested = vi.spyOn(component.editRequested, 'emit');
    const editButton = fixture.nativeElement.querySelector(
      '[aria-label="Editar tarefa"]',
    ) as HTMLButtonElement;

    editButton.click();

    expect(editRequested).toHaveBeenCalledWith(task);
  });

  it('should emit a subtask edit request from the edit button', () => {
    const subtaskEditRequested = vi.spyOn(component.subtaskEditRequested, 'emit');
    const editButton = fixture.nativeElement.querySelector(
      '[aria-label="Editar subtarefa Test subtask"]',
    ) as HTMLButtonElement;

    editButton.click();

    expect(subtaskEditRequested).toHaveBeenCalledWith(task.subtasks[0]);
  });

  it('should display enum labels in Portuguese', () => {
    const category = fixture.nativeElement.querySelector('.badge.category');
    const difficulty = fixture.nativeElement.querySelector('.badge.difficulty');

    expect(category.textContent.trim()).toBe('Sem categoria');
    expect(difficulty.textContent.trim()).toBe('Fácil');
  });
});
