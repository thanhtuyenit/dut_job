import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSearchjobBynameComponent } from './result-searchjob-byname.component';

describe('ResultSearchjobBynameComponent', () => {
  let component: ResultSearchjobBynameComponent;
  let fixture: ComponentFixture<ResultSearchjobBynameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSearchjobBynameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSearchjobBynameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
