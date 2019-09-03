import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementListComponent } from './engagement-list.component';

describe('EngagementListComponent', () => {
  let component: EngagementListComponent;
  let fixture: ComponentFixture<EngagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
