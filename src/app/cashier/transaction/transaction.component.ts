import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  get chipValueChanges(): Subscription {
    return this.chipValue$.subscribe(x => {
      this.chipValue = x;
    });
  }

  get valueOut(): Transaction {
    return build(Transaction, this.form.value);
  }

  ngOnInit() {
    if (this.data) {
      this.setValue(this.data);
    }
    this.subscribe([
      this.chipValueChanges,
    ]);
  }

  ngOnDestroy() {
    this.setValue(new Transaction());
  }

  save() {
    const transaction = this.valueOut;
    this.dispatch(CashierActions.addTransaction(transaction));
    this.myDialogRef.close(transaction);
  }

}
