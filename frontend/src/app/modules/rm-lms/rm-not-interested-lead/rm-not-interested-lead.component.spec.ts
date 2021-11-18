import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNotInterestedLeadComponent } from './rm-not-interested-lead.component';

describe('RmNotInterestedLeadComponent', () => {
  let component: RmNotInterestedLeadComponent;
  let fixture: ComponentFixture<RmNotInterestedLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmNotInterestedLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNotInterestedLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
