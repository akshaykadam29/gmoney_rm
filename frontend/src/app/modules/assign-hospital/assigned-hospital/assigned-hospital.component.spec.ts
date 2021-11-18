import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedHospitalComponent } from './assigned-hospital.component';

describe('AssignedHospitalComponent', () => {
  let component: AssignedHospitalComponent;
  let fixture: ComponentFixture<AssignedHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
