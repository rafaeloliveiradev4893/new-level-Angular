import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UserInfo } from './user-info';
import { Users } from '../../../services/user/users';

describe('UserInfo', () => {
  let component: UserInfo;
  let fixture: ComponentFixture<UserInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfo],
      providers: [
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

    fixture = TestBed.createComponent(UserInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
