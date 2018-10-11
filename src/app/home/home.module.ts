import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { AuctionModule } from '../auction/auction.module';
import { RoundsModule } from '../rounds/rounds.module';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    AuctionModule,
    RoundsModule,
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
