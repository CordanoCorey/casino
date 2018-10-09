import { NgModule } from '@angular/core';

import { RouletteRoutingModule } from './roulette-routing.module';
import { RouletteComponent } from './roulette.component';
import { SharedModule } from '../shared/shared.module';
import { RouletteWheelComponent } from './roulette-wheel/roulette-wheel.component';
import { RouletteSpinHistoryComponent } from './roulette-spin-history/roulette-spin-history.component';
import { RouletteLastSpinComponent } from './roulette-last-spin/roulette-last-spin.component';

@NgModule({
  imports: [
    SharedModule,
    RouletteRoutingModule,
  ],
  declarations: [
    RouletteComponent,
    RouletteWheelComponent,
    RouletteSpinHistoryComponent,
    RouletteLastSpinComponent,
  ]
})
export class RouletteModule { }
