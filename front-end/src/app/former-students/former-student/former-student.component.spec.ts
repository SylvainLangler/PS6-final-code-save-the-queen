import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormerStudentComponent } from './former-student.component';

describe('FormerStudentComponent', () => {
  let component: FormerStudentComponent;
  let fixture: ComponentFixture<FormerStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormerStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormerStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
