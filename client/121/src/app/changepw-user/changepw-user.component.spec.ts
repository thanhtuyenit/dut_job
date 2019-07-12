import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepwUserComponent } from './changepw-user.component';

describe('ChangepwUserComponent', () => {
  let component: ChangepwUserComponent;
  let fixture: ComponentFixture<ChangepwUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepwUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepwUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
