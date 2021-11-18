import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmDoesnotExistLeadComponent } from './rm-doesnot-exist-lead.component';

describe('RmDoesnotExistLeadComponent', () => {
  let component: RmDoesnotExistLeadComponent;
  let fixture: ComponentFixture<RmDoesnotExistLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmDoesnotExistLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmDoesnotExistLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
