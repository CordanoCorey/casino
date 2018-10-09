import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteSpinDistributionComponent } from './roulette-spin-distribution.component';

describe('RouletteSpinDistributionComponent', () => {
  let component: RouletteSpinDistributionComponent;
  let fixture: ComponentFixture<RouletteSpinDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouletteSpinDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouletteSpinDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
