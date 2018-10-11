import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuctionItem } from '../auction.model';
import { auctionItemsSelector } from '../auction.reducer';

@Component({
  selector: 'casino-auction-items',
  templateUrl: './auction-items.component.html',
  styleUrls: ['./auction-items.component.scss']
})
export class AuctionItemsComponent extends SmartComponent implements OnInit {

  auctionItems$: Observable<AuctionItem[]>;

  constructor(public store: Store<any>) {
    super(store);
    this.auctionItems$ = auctionItemsSelector(store);
  }

  ngOnInit() {
  }

}
