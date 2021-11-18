import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanInprocessComponent } from './loan-inprocess.component';

describe('LoanInprocessComponent', () => {
  let component: LoanInprocessComponent;
  let fixture: ComponentFixture<LoanInprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanInprocessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanInprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
