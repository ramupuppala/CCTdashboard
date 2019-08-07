import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoyalityComponent } from './edit-loyality.component';

describe('EditLoyalityComponent', () => {
  let component: EditLoyalityComponent;
  let fixture: ComponentFixture<EditLoyalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLoyalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoyalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
