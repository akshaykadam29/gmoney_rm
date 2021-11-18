import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeViewDialogComponent } from './scheme-view-dialog.component';

describe('SchemeViewDialogComponent', () => {
  let component: SchemeViewDialogComponent;
  let fixture: ComponentFixture<SchemeViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
