import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { RouletteWheel, RouletteBall, RouletteWheelSpin } from './roulette.model';
import { RouletteActions, spinHistorySelector, spinDistributionSelector } from './roulette.reducer';

@Component({
  selector: 'casino-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent extends SmartComponent implements OnInit {

  ball: RouletteBall = new RouletteBall();
  ball$: Observable<RouletteBall>;
  lastSpin: RouletteWheelSpin;
  lastSpin$: Observable<RouletteWheelSpin>;
  moment = 0;
  spinDistribution$: Observable<RouletteWheelSpin[]>;
  spinHistory$: Observable<RouletteWheelSpin[]>;
  testing = false;
  wheel: RouletteWheel;

  constructor(public store: Store<any>) {
    super(store);
    this.spinDistribution$ = spinDistributionSelector(store);
    this.spinHistory$ = spinHistorySelector(store);
  }

  get ballChanges(): Subscription {
    return this.ball$.subscribe(x => {
      this.ball = x;
    });
  }

  get lastSpinChanges(): Subscription {
    return this.lastSpin$.subscribe(x => {
      this.lastSpin = x;
      if (x) {
        this.dispatch(RouletteActions.addSpin(this.lastSpin));
      }
    });
  }

  get noMoreBets(): boolean {
    return false;
  }

  get showStartButton(): boolean {
    return !this.wheel.started;
  }

  get showStopButton(): boolean {
    return this.wheel.started && !this.wheel.spinning;
  }

  ngOnInit() {
    this.wheel = new RouletteWheel(720, 100, 100);
    this.ball$ = this.wheel.ball$;
    this.lastSpin$ = this.wheel.lastSpin$;
    this.subscribe([
      this.ballChanges,
      this.lastSpinChanges,
    ]);
    this.wheel.start();
    this.test();
  }

  test(sampleSize = 100) {
    this.testing = true;
    let i = 0;
    setInterval(() => {
      if (i < sampleSize) {
        this.wheel.startSpin();
        i++;
      }
    }, 40000);
  }

}
