import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDisputeClaimHospitalDialogComponent } from './assign-dispute-claim-hospital-dialog.component';

describe('AssignDisputeClaimHospitalDialogComponent', () => {
  let component: AssignDisputeClaimHospitalDialogComponent;
  let fixture: ComponentFixture<AssignDisputeClaimHospitalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDisputeClaimHospitalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDisputeClaimHospitalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
