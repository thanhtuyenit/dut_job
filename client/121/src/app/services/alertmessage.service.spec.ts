import { TestBed, inject } from '@angular/core/testing';

import { AlertmessageService } from './alertmessage.service';

describe('AlertmessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertmessageService]
    });
  });

  it('should be created', inject([AlertmessageService], (service: AlertmessageService) => {
    expect(service).toBeTruthy();
  }));
});
