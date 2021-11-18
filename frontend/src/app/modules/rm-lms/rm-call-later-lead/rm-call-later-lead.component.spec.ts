import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmCallLaterLeadComponent } from './rm-call-later-lead.component';

describe('RmCallLaterLeadComponent', () => {
  let component: RmCallLaterLeadComponent;
  let fixture: ComponentFixture<RmCallLaterLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmCallLaterLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmCallLaterLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
