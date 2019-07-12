import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCompanyJobComponent } from './post-company-job.component';

describe('PostCompanyJobComponent', () => {
  let component: PostCompanyJobComponent;
  let fixture: ComponentFixture<PostCompanyJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCompanyJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCompanyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
