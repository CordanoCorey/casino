import { NgModule } from '@angular/core';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionItemsComponent } from './auction-items/auction-items.component';
import { SharedModule } from '../shared/shared.module';
import { AuctionItemFormComponent } from './auction-item-form/auction-item-form.component';
import { AuctionItemPreviewComponent } from './auction-item-preview/auction-item-preview.component';

@NgModule({
  imports: [
    SharedModule,
    AuctionRoutingModule,
  ],
  declarations: [
    AuctionItemsComponent,
    AuctionItemFormComponent,
    AuctionItemPreviewComponent,
  ],
  exports: [
    AuctionItemsComponent,
  ]
})
export class AuctionModule { }
