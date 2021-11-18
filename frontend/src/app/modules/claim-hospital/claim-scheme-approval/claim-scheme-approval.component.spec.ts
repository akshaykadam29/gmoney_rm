import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSchemeApprovalComponent } from './claim-scheme-approval.component';

describe('ClaimSchemeApprovalComponent', () => {
  let component: ClaimSchemeApprovalComponent;
  let fixture: ComponentFixture<ClaimSchemeApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimSchemeApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSchemeApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
