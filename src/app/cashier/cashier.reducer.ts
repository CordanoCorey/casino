import { Action, build } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Cashier } from './cashier.model';
import { Totals } from '../shared/models';

export class CashierActions {
    static UPDATE = '[Cashier] Update';
    static UPDATE_TOTALS = '[Cashier] Update Totals';
    static get ALL(): string[] {
        return [
            CashierActions.UPDATE,
            CashierActions.UPDATE_TOTALS,
        ];
    }

    static update(payload: any): Action {
        return {
            type: CashierActions.UPDATE,
            payload
        };
    }

    static updateTotals(bankTotal: number, chipTotal: number): Action {
        return {
            type: CashierActions.UPDATE,
            payload: build(Totals, { bankTotal, chipTotal })
        };
    }

}

export function cashierReducer(state: Cashier = new Cashier(), action: Action): Cashier {
    switch (action.type) {

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
