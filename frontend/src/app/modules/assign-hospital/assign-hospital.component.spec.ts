import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHospitalComponent } from './assign-hospital.component';

describe('AssignHospitalComponent', () => {
  let component: AssignHospitalComponent;
  let fixture: ComponentFixture<AssignHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
