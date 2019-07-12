import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyjobDetailComponent } from './companyjob-detail.component';

describe('CompanyjobDetailComponent', () => {
  let component: CompanyjobDetailComponent;
  let fixture: ComponentFixture<CompanyjobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyjobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyjobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
