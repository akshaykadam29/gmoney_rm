import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmLinkSentLeadComponent } from './rm-link-sent-lead.component';

describe('RmLinkSentLeadComponent', () => {
  let component: RmLinkSentLeadComponent;
  let fixture: ComponentFixture<RmLinkSentLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmLinkSentLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmLinkSentLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
