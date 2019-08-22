import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileListComponent } from './edit-profile-list.component';

describe('EditProfileListComponent', () => {
  let component: EditProfileListComponent;
  let fixture: ComponentFixture<EditProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
