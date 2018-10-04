import { Action } from '@caiu/library';

import { Roulette } from './roulette.model';

export class RouletteActions {
    static get ALL(): string[] {
        return [];
    }
}

export function rouletteReducer(state: Roulette = new Roulette(), action: Action): Roulette {
    switch (action.type) {

        default:
            return state;
    }
}
