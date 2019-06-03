import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeftColumnComponent } from './home-left-column.component';

describe('HomeLeftColumnComponent', () => {
  let component: HomeLeftColumnComponent;
  let fixture: ComponentFixture<HomeLeftColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLeftColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLeftColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
