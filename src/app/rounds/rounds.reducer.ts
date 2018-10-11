import { Action, compareNumbers } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Rounds, Round } from './rounds.model';
import { Totals } from '../shared/models';

export class RoundsActions {
    static SAVE = '[Rounds] SAVE';
    static get ALL(): string[] {
        return [
            RoundsActions.SAVE,
        ];
    }

    static save(payload: Round): Action {
        return {
            type: RoundsActions.SAVE,
            payload
        };
    }
}

export function roundsReducer(state: Rounds = new Rounds(), action: Action): Rounds {
    switch (action.type) {

        case RoundsActions.SAVE:
            return state.update(action.payload);

        default:
            return state;
    }
}

export function roundsSelector(store: Store<any>): Observable<Rounds> {
    return store.select('rounds');
}

export function roundsHistorySelector(store: Store<any>): Observable<Round[]> {
    return roundsSelector(store).pipe(
        map(x => x.asArray.sort((a, b) => compareNumbers(-a.id, -b.id)))
    );
}

export function currentRoundSelector(store: Store<any>): Observable<Round> {
    return roundsSelector(store).pipe(
        map(x => x.currentRound)
    );
}

export function currentRoundIdSelector(store: Store<any>): Observable<number> {
    return currentRoundSelector(store).pipe(
        map(x => x.id),
        distinctUntilChanged()
    );
}

export function totalsSelector(store: Store<any>): Observable<Totals> {
    return currentRoundSelector(store).pipe(
        map(x => x.totals)
    );
}

export function chipValueSelector(store: Store<any>): Observable<number> {
    return totalsSelector(store).pipe(
        map(x => x.chipValue),
        distinctUntilChanged()
    );
}
