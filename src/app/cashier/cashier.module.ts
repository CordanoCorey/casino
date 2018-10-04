import { NgModule } from '@angular/core';

import { CashierRoutingModule } from './cashier-routing.module';
import { CashierComponent } from './cashier.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CashierRoutingModule,
  ],
  declarations: [
    CashierComponent,
  ]
})
export class CashierModule { }
