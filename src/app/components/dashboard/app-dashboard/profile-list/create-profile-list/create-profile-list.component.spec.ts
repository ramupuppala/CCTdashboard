import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfileListComponent } from './create-profile-list.component';

describe('CreateProfileListComponent', () => {
  let component: CreateProfileListComponent;
  let fixture: ComponentFixture<CreateProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
