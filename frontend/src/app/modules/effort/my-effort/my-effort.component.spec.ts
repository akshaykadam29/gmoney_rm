import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEffortComponent } from './my-effort.component';

describe('MyEffortComponent', () => {
  let component: MyEffortComponent;
  let fixture: ComponentFixture<MyEffortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEffortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
