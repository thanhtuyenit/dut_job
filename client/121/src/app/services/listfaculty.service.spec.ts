import { TestBed, inject } from '@angular/core/testing';

import { ListfacultyService } from './listfaculty.service';

describe('ListfacultyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListfacultyService]
    });
  });

  it('should be created', inject([ListfacultyService], (service: ListfacultyService) => {
    expect(service).toBeTruthy();
  }));
});
