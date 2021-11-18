import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHospitalComponent } from './claim-hospital.component';

describe('ClaimHospitalComponent', () => {
  let component: ClaimHospitalComponent;
  let fixture: ComponentFixture<ClaimHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
