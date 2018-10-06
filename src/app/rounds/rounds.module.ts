import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundsComponent } from './rounds.component';
import { RoundFormComponent } from './round-form/round-form.component';
import { RoundLiveComponent } from './round-live/round-live.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RoundsComponent, RoundFormComponent, RoundLiveComponent]
})
export class RoundsModule { }
