import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormerStudentFilterFormComponent } from './former-student-filter-form.component';

describe('FormerStudentFilterFormComponent', () => {
  let component: FormerStudentFilterFormComponent;
  let fixture: ComponentFixture<FormerStudentFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormerStudentFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormerStudentFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
