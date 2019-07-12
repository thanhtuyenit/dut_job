import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKeyskillsComponent } from './add-keyskills.component';

describe('AddKeyskillsComponent', () => {
  let component: AddKeyskillsComponent;
  let fixture: ComponentFixture<AddKeyskillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKeyskillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKeyskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
