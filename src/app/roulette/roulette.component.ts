import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { RouletteWheel, RouletteBall, RouletteWheelSpin } from './roulette.model';

@Component({
  selector: 'casino-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent extends SmartComponent implements OnInit {

  ball: RouletteBall = new RouletteBall();
  ball$: Observable<RouletteBall>;
  lastSpin$: Observable<RouletteWheelSpin>;
  moment = 0;
  wheel: RouletteWheel;

  constructor(public store: Store<any>) {
    super(store);
  }

  get ballChanges(): Subscription {
    return this.ball$.subscribe(x => {
      // console.log('\n\nLEFT:\t', x.positionLeft, '\nTOP:\t', x.positionTop);
      this.ball = x;
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
    this.wheel = new RouletteWheel(600, 100, 100);
    this.ball$ = this.wheel.ball$;
    this.lastSpin$ = this.wheel.lastSpin$;
    this.subscribe([
      this.ballChanges,
    ]);
    this.lastSpin$.subscribe(x => { console.dir(x); });
    this.wheel.start();
    this.wheel.moment$.subscribe(x => {
      if (x === this.moment) {
        console.log(x);
      }
      this.moment = x;
    });
  }

}
