import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimedHospitalComponent } from './claimed-hospital.component';

describe('ClaimedHospitalComponent', () => {
  let component: ClaimedHospitalComponent;
  let fixture: ComponentFixture<ClaimedHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimedHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimedHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
