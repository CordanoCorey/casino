import { Action } from '@caiu/library';

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
            console.dir(action.payload);
            return state.update(action.payload);

        default:
            return state;
    }
}
