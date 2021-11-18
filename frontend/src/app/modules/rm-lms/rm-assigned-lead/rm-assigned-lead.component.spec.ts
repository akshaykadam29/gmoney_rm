import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmAssignedLeadComponent } from './rm-assigned-lead.component';

describe('RmAssignedLeadComponent', () => {
  let component: RmAssignedLeadComponent;
  let fixture: ComponentFixture<RmAssignedLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmAssignedLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmAssignedLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
