import { NgModule } from '@angular/core';
import { LibraryModule, FormsModule } from '@caiu/library';

import { ContainerComponent } from './container/container.component';
import { TotalsComponent } from './totals/totals.component';

@NgModule({
  imports: [
    LibraryModule,
    FormsModule,
  ],
  declarations: [
    ContainerComponent,
    TotalsComponent,
  ],
  exports: [
    LibraryModule,
    ContainerComponent,
    TotalsComponent,
    FormsModule,
  ]
})
export class SharedModule { }
