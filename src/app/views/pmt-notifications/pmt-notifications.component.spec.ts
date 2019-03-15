import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtNotificationsComponent } from './pmt-notifications.component';

describe('PmtNotificationsComponent', () => {
  let component: PmtNotificationsComponent;
  let fixture: ComponentFixture<PmtNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
