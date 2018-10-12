import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';

import { TransactionComponent } from '../cashier/transaction/transaction.component';

@Component({
  selector: 'casino-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends SmartComponent implements OnInit {

  constructor(
    public store: Store<any>,
    public dialog: MatDialog
  ) {
    super(store);
  }

  get sidebarHeight(): number {
    return this.windowHeight - 16;
  }

  get windowHeight(): number {
    return parseInt(localStorage.getItem('WINDOW_HEIGHT'), 10) - 64;
  }

  ngOnInit() {
  }

  doTransaction() {
    super.openDialog(TransactionComponent);
  }

}
