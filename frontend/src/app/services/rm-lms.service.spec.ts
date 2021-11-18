import { TestBed } from '@angular/core/testing';

import { RmLmsService } from './rm-lms.service';

describe('RmLmsService', () => {
  let service: RmLmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmLmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
