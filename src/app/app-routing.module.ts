import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cashier'
  },
  {
    path: 'cashier',
    loadChildren: './cashier/cashier.module#CashierModule'
  },
  {
    path: 'roulette',
    loadChildren: './roulette/roulette.module#RouletteModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
