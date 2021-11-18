import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmOnboardLeadComponent } from './rm-onboard-lead.component';

describe('RmOnboardLeadComponent', () => {
  let component: RmOnboardLeadComponent;
  let fixture: ComponentFixture<RmOnboardLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmOnboardLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmOnboardLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
