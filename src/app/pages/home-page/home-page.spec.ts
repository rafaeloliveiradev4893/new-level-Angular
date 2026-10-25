import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HomePage } from './home-page';
import { ApiTask } from '../../services/task/api-task';
import { ApiEvent } from '../../services/event/api-event';
import { Users } from '../../services/user/users';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        {
          provide: ApiTask,
          useValue: {
            getTasks: () => of([]),
          },
        },
        {
          provide: ApiEvent,
          useValue: {
            getEventsByPeriod: () => of([]),
          },
        },
        {
          provide: Users,
          useValue: {
            getMe: () =>
              of({
                auth0Id: 'auth0|test',
                name: 'Usuário teste',
                level: 1,
                currentXp: 0,
                createdAt: '2026-01-01T00:00:00',
                updatedAt: '2026-01-01T00:00:00',
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
