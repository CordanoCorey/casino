import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SmartComponent, Control } from '@caiu/library';
import { Store } from '@ngrx/store';

import { AuctionItem } from '../auction.model';

@Component({
  selector: 'casino-auction-item-form',
  templateUrl: './auction-item-form.component.html',
  styleUrls: ['./auction-item-form.component.scss']
})
export class AuctionItemFormComponent extends SmartComponent implements OnInit {

  @Control(AuctionItem) form: FormGroup;

  constructor(public store: Store<any>) {
    super(store);
  }

  ngOnInit() {
  }

}
