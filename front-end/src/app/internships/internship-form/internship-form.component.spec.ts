import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipFormComponent } from './internship-form.component';

describe('InternshipFormComponent', () => {
  let component: InternshipFormComponent;
  let fixture: ComponentFixture<InternshipFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
