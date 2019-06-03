import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormerStudentListComponent } from './former-student-list.component';

describe('FormerStudentListComponent', () => {
  let component: FormerStudentListComponent;
  let fixture: ComponentFixture<FormerStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormerStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormerStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
