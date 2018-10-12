import { Component, OnInit } from '@angular/core';
import { SmartComponent, StorageService, RouterService, build } from '@caiu/library';
import { Store } from '@ngrx/store';

import { Auction } from './auction/auction.model';
import { AuctionActions } from './auction/auction.reducer';
import { Cashier } from './cashier/cashier.model';
import { CashierActions } from './cashier/cashier.reducer';
import { Roulette } from './roulette/roulette.model';
import { RouletteActions } from './roulette/roulette.reducer';
import { Rounds } from './rounds/rounds.model';
import { RoundsActions } from './rounds/rounds.reducer';

@Component({
  selector: 'casino-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends SmartComponent implements OnInit {
  title = 'casino';

  constructor(
    public store: Store<any>,
    public storage: StorageService,
    private routerService: RouterService) {
    super(store);
  }

  get localStorageActions(): string[] {
    return [
      ...AuctionActions.ALL,
      ...CashierActions.ALL,
      ...RouletteActions.ALL,
      ...RoundsActions.ALL,
    ];
  }

  get localStorageMapper(): (s: any) => any {
    return (state) => {
      const auction = build(Auction, state ? state['auction'] : {});
      const cashier = build(Cashier, state ? state['cashier'] : {});
      const roulette = build(Roulette, state ? state['roulette'] : {});
      const rounds = build(Rounds, state ? state['rounds'] : {});
      return { auction, cashier, roulette, rounds };
    };
  }

  get sessionStorageActions(): string[] {
    return [];
  }

  get sessionStorageMapper(): (s: any) => any {
    return state => { };
  }

  ngOnInit() {
    this.storage.init(this.localStorageMapper, this.sessionStorageMapper, this.localStorageActions, this.sessionStorageActions);
  }

}
