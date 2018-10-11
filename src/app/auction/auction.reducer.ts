import { Action } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Auction, AuctionItem } from './auction.model';

export class AuctionActions {
    static SAVE = '[Auction] SAVE';
    static get ALL(): string[] {
        return [
            AuctionActions.SAVE,
        ];
    }

    static save(payload: Auction): Action {
        return {
            type: AuctionActions.SAVE,
            payload
        };
    }
}

export function auctionReducer(state: Auction = new Auction(), action: Action): Auction {
    switch (action.type) {

        case AuctionActions.SAVE:
            return state.update(action.payload);

        default:
            return state;
    }
}

export function auctionSelector(store: Store<any>): Observable<Auction> {
    return store.select('auction');
}

export function auctionItemsSelector(store: Store<any>): Observable<AuctionItem[]> {
    return auctionSelector(store).pipe(
        map(x => x.asArray)
    );
}
