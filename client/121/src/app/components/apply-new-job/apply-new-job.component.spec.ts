import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyNewJobComponent } from './apply-new-job.component';

describe('ApplyNewJobComponent', () => {
  let component: ApplyNewJobComponent;
  let fixture: ComponentFixture<ApplyNewJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyNewJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyNewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
