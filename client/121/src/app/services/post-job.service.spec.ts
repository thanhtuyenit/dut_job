import { TestBed, inject } from '@angular/core/testing';

import { PostJobService } from './post-job.service';

describe('PostJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostJobService]
    });
  });

  it('should be created', inject([PostJobService], (service: PostJobService) => {
    expect(service).toBeTruthy();
  }));
});
