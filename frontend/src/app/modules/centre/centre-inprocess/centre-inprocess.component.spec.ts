import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreInprocessComponent } from './centre-inprocess.component';

describe('CentreInprocessComponent', () => {
  let component: CentreInprocessComponent;
  let fixture: ComponentFixture<CentreInprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreInprocessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreInprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
