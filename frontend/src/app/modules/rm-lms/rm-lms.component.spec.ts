import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmLmsComponent } from './rm-lms.component';

describe('RmLmsComponent', () => {
  let component: RmLmsComponent;
  let fixture: ComponentFixture<RmLmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmLmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmLmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
