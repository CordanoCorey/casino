import { NgModule } from '@angular/core';

import { RouletteRoutingModule } from './roulette-routing.module';
import { RouletteComponent } from './roulette.component';
import { SharedModule } from '../shared/shared.module';
import { RouletteWheelComponent } from './roulette-wheel/roulette-wheel.component';
import { RouletteSpinComponent } from './roulette-spin/roulette-spin.component';
import { RouletteSpinHistoryComponent } from './roulette-spin-history/roulette-spin-history.component';
import { RouletteSpinDistributionComponent } from './roulette-spin-distribution/roulette-spin-distribution.component';

@NgModule({
  imports: [
    SharedModule,
    RouletteRoutingModule,
  ],
  declarations: [
    RouletteComponent,
    RouletteWheelComponent,
    RouletteSpinComponent,
    RouletteSpinHistoryComponent,
    RouletteSpinDistributionComponent,
  ]
})
export class RouletteModule { }
