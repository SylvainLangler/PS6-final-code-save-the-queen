import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipFilterFormComponent } from './internship-filter-form.component';

describe('InternshipFilterFormComponent', () => {
  let component: InternshipFilterFormComponent;
  let fixture: ComponentFixture<InternshipFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
