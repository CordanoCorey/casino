import { NgModule } from '@angular/core';

import { CashierRoutingModule } from './cashier-routing.module';
import { CashierComponent } from './cashier.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CashierRoutingModule,
  ],
  declarations: [
    CashierComponent,
    TransactionComponent,
  ],
  exports: [
    TransactionComponent,
  ],
  entryComponents: [
    TransactionComponent,
  ]
})
export class CashierModule { }
