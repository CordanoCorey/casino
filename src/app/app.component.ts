import { Component } from '@angular/core';
import { SmartComponent, StorageService, RouterService, build } from '@caiu/library';
import { Store } from '@ngrx/store';

import { Cashier } from './cashier/cashier.model';
import { CashierActions } from './cashier/cashier.reducer';
import { Roulette } from './roulette/roulette.model';
import { RouletteActions } from './roulette/roulette.reducer';

@Component({
  selector: 'casino-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends SmartComponent {
  title = 'casino';

  constructor(
    public store: Store<any>,
    public storage: StorageService,
    private routerService: RouterService) {
    super(store);
  }

  get localStorageActions(): string[] {
    return [
      ...CashierActions.ALL,
      ...RouletteActions.ALL,
    ];
  }

  get localStorageMapper(): (s: any) => any {
    return state => {
      const cashier = build(Cashier, state['cashier']);
      const roulette = build(Roulette, state['roulette'])
      return { cashier, roulette };
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

    this.initStorage();
  }

  initStorage() {
    this.storage.init(this.localStorageMapper, this.sessionStorageMapper, this.localStorageActions, this.sessionStorageActions);
  }

}
