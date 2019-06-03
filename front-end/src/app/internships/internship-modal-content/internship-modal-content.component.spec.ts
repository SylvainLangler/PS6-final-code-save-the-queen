import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipModalContentComponent } from './internship-modal-content.component';

describe('InternshipModalContentComponent', () => {
  let component: InternshipModalContentComponent;
  let fixture: ComponentFixture<InternshipModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipModalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
