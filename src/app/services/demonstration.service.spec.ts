import { TestBed } from '@angular/core/testing';

import { DemonstrationService } from './demonstration.service';

describe('DemonstrationService', () => {
  let service: DemonstrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemonstrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
