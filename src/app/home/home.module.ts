import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AuctionModule } from '../auction/auction.module';
import { CashierModule } from '../cashier/cashier.module';
import { RoundsModule } from '../rounds/rounds.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    AuctionModule,
    CashierModule,
    RoundsModule,
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
