import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SmartComponent, Control, build } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Transaction } from '../cashier.model';
import { CashierActions, chipValueSelector } from '../cashier.reducer';

@Component({
  selector: 'casino-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent extends SmartComponent implements OnInit, OnDestroy {

  @Control(Transaction) form: FormGroup;
  chipValue = 0;
  chipValue$: Observable<number>;

  constructor(
    public store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction,
    public myDialogRef: MatDialogRef<TransactionComponent>) {
    super(store);
    this.chipValue$ = chipValueSelector(store);
  }

  get cash(): number {
    return this.cashTotalControl.value;
  }

  get chips(): number {
    return this.chipTotalControl.value;
  }

  get cashFromChips(): number {
    return this.chips2cash(this.chips);
  }

  get chipsFromCash(): number {
    return this.cash2chips(this.cash);
  }

  get cashTotalControl(): AbstractControl {
    return this.form.controls['cashTotal'];
  }

  get cashTotalChanges(): Subscription {
    return this.cashTotalControl.valueChanges.subscribe(cashTotal => {
      const chips = this.cash2chips(cashTotal);
      // console.log(this.chipValue, cashTotal, chips, this.chipTotalControl.value);
      if (this.chipTotalControl.value !== chips) {
        // this.chipTotalControl.setValue(chips);
      }
    });
  }

  get chipTotalControl(): AbstractControl {
    return this.form.controls['chipTotal'];
  }

  get chipTotalChanges(): Subscription {
    return this.cashTotalControl.valueChanges.subscribe(chipTotal => {
      const cash = this.chips2cash(chipTotal);
      // console.log(this.chipValue, cash, chipTotal, this.cashTotalControl.value);
      if (this.cashTotalControl.value !== cash) {
        // this.cashTotalControl.setValue(cash);
      }
    });
  }

  get chipValueChanges(): Subscription {
    return this.chipValue$.subscribe(x => {
      this.chipValue = x;
    });
  }

  get valueOut(): Transaction {
    return build(Transaction, this.form.value);
  }

  ngOnInit() {
    this.subscribe([
      this.chipValueChanges,
      this.cashTotalChanges,
      this.chipTotalChanges,
    ]);
  }

  ngOnDestroy() {
    this.setValue(new Transaction());
  }

  cash2chips(cash: number): number {
    return cash * (100 / this.chipValue);
  }

  chips2cash(chips: number): number {
    return chips * this.chipValue / 100;
  }

  save() {
    const transaction = this.valueOut;
    this.dispatch(CashierActions.addTransaction(transaction));
    this.myDialogRef.close(transaction);
  }

}
