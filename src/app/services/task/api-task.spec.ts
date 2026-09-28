import { TestBed } from '@angular/core/testing';

import { ApiTask } from './api-task';

describe('ApiTask', () => {
  let service: ApiTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
