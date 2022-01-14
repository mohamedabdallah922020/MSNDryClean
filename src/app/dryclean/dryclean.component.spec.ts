import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrycleanComponent } from './dryclean.component';

describe('DrycleanComponent', () => {
  let component: DrycleanComponent;
  let fixture: ComponentFixture<DrycleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrycleanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrycleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
