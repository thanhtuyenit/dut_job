import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKeyskillsComponent } from './edit-keyskills.component';

describe('EditKeyskillsComponent', () => {
  let component: EditKeyskillsComponent;
  let fixture: ComponentFixture<EditKeyskillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditKeyskillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKeyskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
