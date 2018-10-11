import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { build, Time, SmartComponent, TimerComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { RoundsActions, currentRoundSelector } from '../rounds.reducer';
import { Totals } from '../../shared/models';
import { Round } from '../rounds.model';

@Component({
  selector: 'casino-round-live',
  templateUrl: './round-live.component.html',
  styleUrls: ['./round-live.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoundLiveComponent extends SmartComponent implements OnInit {

  @ViewChild(TimerComponent) timer: TimerComponent;
  countdownFrom = build(Time, {
    minutes: 1,
  });
  currentRound: Round = new Round();
  currentRound$: Observable<Round>;
  roundNumber = 1;

  constructor(public store: Store<any>) {
    super(store);
    this.currentRound$ = currentRoundSelector(store);
  }

  get currentRoundChanges(): Subscription {
    return this.currentRound$.subscribe(x => {
      this.currentRound = x;
    });
  }

  get exchangeRate(): number {
    return this.totals.chipValue / 100;
  }

  get totals(): Totals {
    return this.currentRound.totals;
  }

  ngOnInit() {
    this.subscribe([
      this.currentRoundChanges,
    ]);
  }

  onSaveRound(totals: Totals) {
    this.saveRound(build(Round, {
      id: this.currentRound.id,
      totals
    }));
  }

  onTimesUp() {
    this.timer.startAt(this.countdownFrom);
    this.roundNumber += 1;
  }

  saveRound(data: Round) {
    this.dispatch(RoundsActions.save(data));
  }

}
