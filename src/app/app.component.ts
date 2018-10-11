import { Component, OnInit } from '@angular/core';
import { SmartComponent, StorageService, RouterService, build } from '@caiu/library';
import { Store } from '@ngrx/store';

import { Auction } from './auction/auction.model';
import { AuctionActions } from './auction/auction.reducer';
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
      ...RouletteActions.ALL,
      ...RoundsActions.ALL,
    ];
  }

  get localStorageMapper(): (s: any) => any {
    return (state) => {
      const auction = build(Auction, state['auction']);
      const roulette = build(Roulette, state['roulette']);
      const rounds = build(Rounds, state['rounds']);
      return { auction, roulette, rounds };
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
