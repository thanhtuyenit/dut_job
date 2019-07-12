import { TestBed, inject } from '@angular/core/testing';

import { ApplyJobService } from './apply-job.service';

describe('ApplyJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplyJobService]
    });
  });

  it('should be created', inject([ApplyJobService], (service: ApplyJobService) => {
    expect(service).toBeTruthy();
  }));
});
