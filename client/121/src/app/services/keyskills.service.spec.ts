import { TestBed, inject } from '@angular/core/testing';

import { KeyskillsService } from './keyskills.service';

describe('KeyskillsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyskillsService]
    });
  });

  it('should be created', inject([KeyskillsService], (service: KeyskillsService) => {
    expect(service).toBeTruthy();
  }));
});
