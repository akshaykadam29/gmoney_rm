import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEffortComponent } from './team-effort.component';

describe('TeamEffortComponent', () => {
  let component: TeamEffortComponent;
  let fixture: ComponentFixture<TeamEffortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamEffortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
