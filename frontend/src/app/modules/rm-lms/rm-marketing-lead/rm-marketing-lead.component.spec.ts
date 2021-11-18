import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmMarketingLeadComponent } from './rm-marketing-lead.component';

describe('RmMarketingLeadComponent', () => {
  let component: RmMarketingLeadComponent;
  let fixture: ComponentFixture<RmMarketingLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmMarketingLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmMarketingLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
