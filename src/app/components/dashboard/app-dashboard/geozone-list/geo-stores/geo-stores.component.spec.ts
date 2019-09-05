import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoStoresComponent } from './geo-stores.component';

describe('GeoStoresComponent', () => {
  let component: GeoStoresComponent;
  let fixture: ComponentFixture<GeoStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
