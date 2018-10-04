import { NgModule } from '@angular/core';

import { RouletteRoutingModule } from './roulette-routing.module';
import { RouletteComponent } from './roulette.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouletteRoutingModule,
  ],
  declarations: [
    RouletteComponent,
  ]
})
export class RouletteModule { }
