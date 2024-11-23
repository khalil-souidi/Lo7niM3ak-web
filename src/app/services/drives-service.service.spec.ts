import { TestBed } from '@angular/core/testing';

import { DrivesServiceService } from './drives-service.service';

describe('DrivesServiceService', () => {
  let service: DrivesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrivesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
