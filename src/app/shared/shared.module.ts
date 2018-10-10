import { NgModule } from '@angular/core';
import { LibraryModule, FormsModule } from '@caiu/library';

import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TotalsComponent } from './totals/totals.component';
import { RulesComponent } from './rules/rules.component';
import { ChipValuesComponent } from './chip-values/chip-values.component';
import { FloorMapComponent } from './floor-map/floor-map.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  imports: [
    LibraryModule,
    FormsModule,
  ],
  declarations: [
    ContainerComponent,
    ExchangeRateComponent,
    HeaderComponent,
    SidenavComponent,
    TotalsComponent,
    RulesComponent,
    ChipValuesComponent,
    FloorMapComponent,
    ScheduleComponent,
  ],
  exports: [
    LibraryModule,
    FormsModule,
    ContainerComponent,
    ExchangeRateComponent,
    TotalsComponent,
  ]
})
export class SharedModule { }
