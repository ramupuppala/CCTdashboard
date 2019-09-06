import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBrandComponent } from './store-brand.component';

describe('StoreBrandComponent', () => {
  let component: StoreBrandComponent;
  let fixture: ComponentFixture<StoreBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
