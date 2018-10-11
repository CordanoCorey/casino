import { Action, compareNumbers, StorageActions, build } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Roulette, RouletteWheelSpin } from './roulette.model';

export class RouletteActions {
    static ADD_SPIN = `[Roulette] Add Spin`;
    static get ALL(): string[] {
        return [
            RouletteActions.ADD_SPIN,
        ];
    }

    static addSpin(payload: RouletteWheelSpin): Action {
        return {
            type: RouletteActions.ADD_SPIN,
            payload
        };
    }

}

export function rouletteReducer(state: Roulette = new Roulette(), action: Action): Roulette {
    switch (action.type) {

        case RouletteActions.ADD_SPIN:
            // console.dir(action.payload.slotNumber);
            return state.addSpin(action.payload);

        case StorageActions.INIT_STORE:
            return action.payload.localStore && action.payload.localStore.roulette ?
                state.restore(action.payload.localStore.roulette) : state;

        default:
            return state;
    }
}

export function rouletteSelector(store: Store<any>): Observable<Roulette> {
    return store.select('roulette');
}

export function spinHistorySelector(store: Store<any>): Observable<RouletteWheelSpin[]> {
    return rouletteSelector(store).pipe(
        map(x => x.asArray
            .sort((a, b) => compareNumbers(-a.moment, -b.moment))
            .filter((y, i) => i < 25))
    );
}

export function spinDistributionSelector(store: Store<any>): Observable<RouletteWheelSpin[]> {
    return rouletteSelector(store).pipe(
        map(x => x.asArray)
    );
}
