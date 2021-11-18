import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardedLeadComponent } from './onboarded-lead.component';

describe('OnboardedLeadComponent', () => {
  let component: OnboardedLeadComponent;
  let fixture: ComponentFixture<OnboardedLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardedLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
