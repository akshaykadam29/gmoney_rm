import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDisbursedComponent } from './loan-disbursed.component';

describe('LoanDisbursedComponent', () => {
  let component: LoanDisbursedComponent;
  let fixture: ComponentFixture<LoanDisbursedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanDisbursedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDisbursedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
