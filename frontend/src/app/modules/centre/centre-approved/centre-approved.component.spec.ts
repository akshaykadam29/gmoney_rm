import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreApprovedComponent } from './centre-approved.component';

describe('CentreApprovedComponent', () => {
  let component: CentreApprovedComponent;
  let fixture: ComponentFixture<CentreApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
