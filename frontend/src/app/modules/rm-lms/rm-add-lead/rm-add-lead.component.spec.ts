import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmAddLeadComponent } from './rm-add-lead.component';

describe('RmAddLeadComponent', () => {
  let component: RmAddLeadComponent;
  let fixture: ComponentFixture<RmAddLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmAddLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmAddLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
