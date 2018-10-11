import { NgModule } from '@angular/core';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionItemsComponent } from './auction-items/auction-items.component';
import { SharedModule } from '../shared/shared.module';
import { AuctionItemFormComponent } from './auction-item-form/auction-item-form.component';

@NgModule({
  imports: [
    SharedModule,
    AuctionRoutingModule,
  ],
  declarations: [
    AuctionItemsComponent,
    AuctionItemFormComponent,
  ],
  exports: [
    AuctionItemsComponent,
  ]
})
export class AuctionModule { }
