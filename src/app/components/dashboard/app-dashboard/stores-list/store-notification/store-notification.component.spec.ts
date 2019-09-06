import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreNotificationComponent } from './store-notification.component';

describe('StoreNotificationComponent', () => {
  let component: StoreNotificationComponent;
  let fixture: ComponentFixture<StoreNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
