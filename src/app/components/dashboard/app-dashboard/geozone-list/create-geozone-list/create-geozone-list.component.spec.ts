import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeozoneListComponent } from './create-geozone-list.component';

describe('CreateGeozoneListComponent', () => {
  let component: CreateGeozoneListComponent;
  let fixture: ComponentFixture<CreateGeozoneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGeozoneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGeozoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
