import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyFilterFormComponent } from './agency-filter-form.component';

describe('AgencyFilterFormComponent', () => {
  let component: AgencyFilterFormComponent;
  let fixture: ComponentFixture<AgencyFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
