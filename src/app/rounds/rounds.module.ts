import { NgModule } from '@angular/core';

import { RoundsComponent } from './rounds.component';
import { RoundFormComponent } from './round-form/round-form.component';
import { RoundLiveComponent } from './round-live/round-live.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    RoundsComponent,
    RoundFormComponent,
    RoundLiveComponent,
  ],
  exports: [
    RoundsComponent,
    RoundFormComponent,
    RoundLiveComponent,
  ]
})
export class RoundsModule { }
