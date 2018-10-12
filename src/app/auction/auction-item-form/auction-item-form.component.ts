import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SmartComponent, Control, build } from '@caiu/library';
import { Store } from '@ngrx/store';

import { AuctionItem } from '../auction.model';
import { AuctionActions } from '../auction.reducer';

@Component({
  selector: 'casino-auction-item-form',
  templateUrl: './auction-item-form.component.html',
  styleUrls: ['./auction-item-form.component.scss']
})
export class AuctionItemFormComponent extends SmartComponent implements OnInit {

  @Control(AuctionItem) form: FormGroup;

  constructor(
    public store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: AuctionItem,
    public myDialogRef: MatDialogRef<AuctionItemFormComponent>) {
    super(store);
  }

  get valueOut(): AuctionItem {
    return build(AuctionItem, this.data, this.form.value);
  }

  ngOnInit() {
    this.setValue(this.data);
  }

  save() {
    const item = this.valueOut;
    this.dispatch(AuctionActions.save(item));
    this.myDialogRef.close(item);
  }

}
