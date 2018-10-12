import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuctionItemFormComponent } from '../auction-item-form/auction-item-form.component';
import { AuctionItem } from '../auction.model';
import { auctionItemsSelector } from '../auction.reducer';

@Component({
  selector: 'casino-auction-items',
  templateUrl: './auction-items.component.html',
  styleUrls: ['./auction-items.component.scss']
})
export class AuctionItemsComponent extends SmartComponent implements OnInit {

  auctionItems$: Observable<AuctionItem[]>;

  constructor(
    public store: Store<any>,
    public dialog: MatDialog
  ) {
    super(store);
    this.auctionItems$ = auctionItemsSelector(store);
  }

  ngOnInit() {
  }

  edit(data: AuctionItem) {
    super.openDialog(AuctionItemFormComponent, {
      data
    });
  }

}
