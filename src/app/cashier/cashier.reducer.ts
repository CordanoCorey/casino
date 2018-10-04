import { Action } from '@caiu/library';

import { Cashier } from './cashier.model';

export function cashierReducer(state: Cashier = new Cashier(), action: Action): Cashier {
    switch (action.type) {

        default:
            return state;
    }
}
