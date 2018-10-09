import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteSpinHistoryComponent } from './roulette-spin-history.component';

describe('RouletteSpinHistoryComponent', () => {
  let component: RouletteSpinHistoryComponent;
  let fixture: ComponentFixture<RouletteSpinHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouletteSpinHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouletteSpinHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
