import { Action, build } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Cashier, Transaction } from './cashier.model';
import { Totals } from '../shared/models';
import { AuctionActions } from '../auction/auction.reducer';

export class CashierActions {
    static ADD_TRANSACTION = '[Cashier] Add Transaction';
    static UPDATE = '[Cashier] Update';
    static UPDATE_TOTALS = '[Cashier] Update Totals';
    static get ALL(): string[] {
        return [
            CashierActions.UPDATE,
            CashierActions.UPDATE_TOTALS,
        ];
    }

    static addTransaction(payload: Transaction): Action {
        return {
            type: CashierActions.ADD_TRANSACTION,
            payload
        };
    }

    static update(payload: any): Action {
        return {
            type: CashierActions.UPDATE,
            payload
        };
    }

    static updateTotals(cashTotal: number, chipTotal: number): Action {
        return {
            type: CashierActions.UPDATE,
            payload: build(Totals, { cashTotal, chipTotal })
        };
    }

}

export function cashierReducer(state: Cashier = new Cashier(), action: Action): Cashier {
    switch (action.type) {

        case CashierActions.ADD_TRANSACTION:
            return state.addTransaction(action.payload);

        case AuctionActions.SAVE:
            return state.saveAuctionItem(action.payload);

        default:
            return state;
    }
}

export function cashierSelector(store: Store<any>): Observable<Cashier> {
    return store.select('cashier');
}

export function totalsSelector(store: Store<any>): Observable<Totals> {
    return cashierSelector(store).pipe(
        map(x => x.totals)
    );
}

export function chipValueSelector(store: Store<any>): Observable<number> {
    return totalsSelector(store).pipe(
        map(x => x.chipValue),
        distinctUntilChanged()
    );
}
