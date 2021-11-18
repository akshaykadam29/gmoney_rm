import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedLeadComponent } from './unassigned-lead.component';

describe('UnassignedLeadComponent', () => {
  let component: UnassignedLeadComponent;
  let fixture: ComponentFixture<UnassignedLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignedLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
