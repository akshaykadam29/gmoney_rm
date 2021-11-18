import { TestBed } from '@angular/core/testing';

import { RmUserService } from './rm-user.service';

describe('RmUserService', () => {
  let service: RmUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
