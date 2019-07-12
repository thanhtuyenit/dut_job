import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAllJobsComponent } from './company-all-jobs.component';

describe('CompanyAllJobsComponent', () => {
  let component: CompanyAllJobsComponent;
  let fixture: ComponentFixture<CompanyAllJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAllJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAllJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
