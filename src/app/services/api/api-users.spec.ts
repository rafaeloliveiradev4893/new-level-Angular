import { TestBed } from '@angular/core/testing';

import { ApiUsers } from './api-users';

describe('ApiUsers', () => {
  let service: ApiUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
