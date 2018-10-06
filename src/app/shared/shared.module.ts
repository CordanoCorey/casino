import { NgModule } from '@angular/core';
import { LibraryModule, FormsModule } from '@caiu/library';

import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TotalsComponent } from './totals/totals.component';
import { RulesComponent } from './rules/rules.component';
import { ChipValuesComponent } from './chip-values/chip-values.component';

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
