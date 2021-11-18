import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClaimedHospitalComponent } from './my-claimed-hospital.component';

describe('MyClaimedHospitalComponent', () => {
  let component: MyClaimedHospitalComponent;
  let fixture: ComponentFixture<MyClaimedHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyClaimedHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClaimedHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
