import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsAssignComponent } from './leads-assign.component';

describe('LeadsAssignComponent', () => {
  let component: LeadsAssignComponent;
  let fixture: ComponentFixture<LeadsAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
