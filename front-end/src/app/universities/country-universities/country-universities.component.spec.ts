import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryUniversitiesComponent } from './country-universities.component';

describe('CountryUniversitiesComponent', () => {
  let component: CountryUniversitiesComponent;
  let fixture: ComponentFixture<CountryUniversitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryUniversitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryUniversitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
