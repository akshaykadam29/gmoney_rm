import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnclaimedHospitalComponent } from './unclaimed-hospital.component';

describe('UnclaimedHospitalComponent', () => {
  let component: UnclaimedHospitalComponent;
  let fixture: ComponentFixture<UnclaimedHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnclaimedHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnclaimedHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
