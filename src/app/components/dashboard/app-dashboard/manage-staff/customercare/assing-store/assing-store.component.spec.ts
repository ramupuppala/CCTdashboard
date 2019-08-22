import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingStoreComponent } from './assing-store.component';

describe('AssingStoreComponent', () => {
  let component: AssingStoreComponent;
  let fixture: ComponentFixture<AssingStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssingStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
