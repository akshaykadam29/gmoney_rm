import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRejectedComponent } from './loan-rejected.component';

describe('LoanRejectedComponent', () => {
  let component: LoanRejectedComponent;
  let fixture: ComponentFixture<LoanRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
