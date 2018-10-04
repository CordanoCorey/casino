import { Component, OnInit, ViewChild } from '@angular/core';
import { build, Time, SmartComponent, TimerComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CashierActions, totalsSelector } from './cashier.reducer';
import { Totals } from '../shared/models';

@Component({
  selector: 'casino-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent extends SmartComponent implements OnInit {

  @ViewChild(TimerComponent) timer: TimerComponent;
  countdownFrom = build(Time, {
    minutes: 1,
  });
  totals$: Observable<Totals>;
  remainingRounds = 30;

  constructor(public store: Store<any>) {
    super(store);
    this.totals$ = totalsSelector(store);
  }

  ngOnInit() {
  }

  onSaveTotals(e: Totals) {
    this.updateTotals(e.bankTotal, e.chipTotal);
  }

  onTimesUp() {
    this.timer.startAt(this.countdownFrom);
    this.remainingRounds -= 1;
  }

  update(data: any) {
    this.dispatch(CashierActions.update(data));
  }

  updateTotals(bankTotal: number, chipTotal: number) {
    this.dispatch(CashierActions.updateTotals(bankTotal, chipTotal));
  }

}
