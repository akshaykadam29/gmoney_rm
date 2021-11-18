import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmVisitLeadComponent } from './rm-visit-lead.component';

describe('RmVisitLeadComponent', () => {
  let component: RmVisitLeadComponent;
  let fixture: ComponentFixture<RmVisitLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmVisitLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmVisitLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
