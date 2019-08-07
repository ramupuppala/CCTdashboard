import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastNotificationComponent } from './broadcast-notification.component';

describe('BroadcastNotificationComponent', () => {
  let component: BroadcastNotificationComponent;
  let fixture: ComponentFixture<BroadcastNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
