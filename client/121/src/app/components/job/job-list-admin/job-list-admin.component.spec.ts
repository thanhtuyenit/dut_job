import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListAdminComponent } from './job-list-admin.component';

describe('JobListAdminComponent', () => {
  let component: JobListAdminComponent;
  let fixture: ComponentFixture<JobListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
