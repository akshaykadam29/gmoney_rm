import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmAppoinmentLeadComponent } from './rm-appoinment-lead.component';

describe('RmAppoinmentLeadComponent', () => {
  let component: RmAppoinmentLeadComponent;
  let fixture: ComponentFixture<RmAppoinmentLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmAppoinmentLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmAppoinmentLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
