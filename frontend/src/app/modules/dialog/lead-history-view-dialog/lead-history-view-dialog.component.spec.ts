import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadHistoryViewDialogComponent } from './lead-history-view-dialog.component';

describe('LeadHistoryViewDialogComponent', () => {
  let component: LeadHistoryViewDialogComponent;
  let fixture: ComponentFixture<LeadHistoryViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadHistoryViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadHistoryViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
