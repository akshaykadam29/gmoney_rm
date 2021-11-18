import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmInProcessLeadComponent } from './rm-in-process-lead.component';

describe('RmInProcessLeadComponent', () => {
  let component: RmInProcessLeadComponent;
  let fixture: ComponentFixture<RmInProcessLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmInProcessLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmInProcessLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
