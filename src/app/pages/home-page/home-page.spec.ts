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
                atributos: {
                  forca: 1,
                  destreza: 1,
                  constituicao: 1,
                  inteligencia: 1,
                  sabedoria: 1,
                  carisma: 1,
                },
                atributosXp: {
                  forca: 0,
                  destreza: 0,
                  constituicao: 0,
                  inteligencia: 0,
                  sabedoria: 0,
                  carisma: 0,
                },
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
