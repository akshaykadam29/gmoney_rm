import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreOnholdComponent } from './centre-onhold.component';

describe('CentreOnholdComponent', () => {
  let component: CentreOnholdComponent;
  let fixture: ComponentFixture<CentreOnholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreOnholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreOnholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
