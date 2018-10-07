import { NgModule } from '@angular/core';

import { RouletteRoutingModule } from './roulette-routing.module';
import { RouletteComponent } from './roulette.component';
import { SharedModule } from '../shared/shared.module';
import { RouletteWheelComponent } from './roulette-wheel/roulette-wheel.component';

@NgModule({
  imports: [
    SharedModule,
    RouletteRoutingModule,
  ],
  declarations: [
    RouletteComponent,
    RouletteWheelComponent,
  ]
})
export class RouletteModule { }
