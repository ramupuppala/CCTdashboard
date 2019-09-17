import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreNotificationComponent } from './create-store-notification.component';

describe('CreateStoreNotificationComponent', () => {
  let component: CreateStoreNotificationComponent;
  let fixture: ComponentFixture<CreateStoreNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStoreNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStoreNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
