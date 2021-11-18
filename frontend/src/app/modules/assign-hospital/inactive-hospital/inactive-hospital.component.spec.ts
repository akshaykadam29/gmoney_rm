import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveHospitalComponent } from './inactive-hospital.component';

describe('InactiveHospitalComponent', () => {
  let component: InactiveHospitalComponent;
  let fixture: ComponentFixture<InactiveHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
