import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  ErrorsModule,
  errorsReducer,
  EventEffects,
  eventsReducer,
  HttpModule,
  HttpEffects,
  LookupModule,
  lookupReducer,
  RouterModule,
  RouterEffects,
  routerReducer,
  StorageModule,
  StorageEffects,
  StoreModule,
  windowReducer,
  apiBaseUrlSelector
} from '@caiu/library';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { cashierReducer } from './cashier/cashier.reducer';
import { rouletteReducer } from './roulette/roulette.reducer';
import { SharedModule } from './shared/shared.module';


export const reducers: ActionReducerMap<any> = {
  cashier: cashierReducer,
  roulette: rouletteReducer
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([
    ]),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(),
    SharedModule,
    StorageModule.forRoot('CASINO_STORE'),
    StoreModule.forRoot(reducers),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
