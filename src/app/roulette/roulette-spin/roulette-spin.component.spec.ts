import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteSpinComponent } from './roulette-spin.component';

describe('RouletteSpinComponent', () => {
  let component: RouletteSpinComponent;
  let fixture: ComponentFixture<RouletteSpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouletteSpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouletteSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
