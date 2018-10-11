import { Component, OnInit, ViewChild } from '@angular/core';
import { build, Time, SmartComponent, TimerComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { totalsSelector, chipValueSelector, RoundsActions, currentRoundIdSelector } from '../rounds.reducer';
import { Totals } from '../../shared/models';
import { Round } from '../rounds.model';

@Component({
  selector: 'casino-round-live',
  templateUrl: './round-live.component.html',
  styleUrls: ['./round-live.component.scss']
})
export class RoundLiveComponent extends SmartComponent implements OnInit {

  @ViewChild(TimerComponent) timer: TimerComponent;
  countdownFrom = build(Time, {
    minutes: 1,
  });
  chipValue$: Observable<number>;
  currentRoundId = 0;
  currentRoundId$: Observable<number>;
  totals$: Observable<Totals>;
  remainingRounds = 30;

  constructor(public store: Store<any>) {
    super(store);
    this.chipValue$ = chipValueSelector(store);
    this.currentRoundId$ = currentRoundIdSelector(store);
    this.totals$ = totalsSelector(store);
  }

  get currentRoundIdChanges(): Subscription {
    return this.currentRoundId$.subscribe(id => {
      this.currentRoundId = id;
    });
  }

  ngOnInit() {
    this.subscribe([
      this.currentRoundIdChanges,
    ]);
  }

  onSaveRound(totals: Totals) {
    this.saveRound(build(Round, {
      id: this.currentRoundId,
      totals
    }));
  }

  onTimesUp() {
    this.timer.startAt(this.countdownFrom);
    this.remainingRounds -= 1;
  }

  saveRound(data: Round) {
    this.dispatch(RoundsActions.save(data));
  }

}
