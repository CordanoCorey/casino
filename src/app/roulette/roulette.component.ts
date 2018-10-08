import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { RouletteWheel, RouletteBall } from './roulette.model';

@Component({
  selector: 'casino-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent extends SmartComponent implements OnInit {

  ball: RouletteBall = new RouletteBall();
  ball$: Observable<RouletteBall>;
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
    this.wheel = new RouletteWheel(600, 200, 150);
    this.ball$ = this.wheel.ball$;
    this.subscribe([
      this.ballChanges,
    ]);
  }

}
