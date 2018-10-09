import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteLastSpinComponent } from './roulette-last-spin.component';

describe('RouletteLastSpinComponent', () => {
  let component: RouletteLastSpinComponent;
  let fixture: ComponentFixture<RouletteLastSpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouletteLastSpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouletteLastSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
