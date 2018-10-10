import { Action } from '@caiu/library';

import { Rounds, Round } from './rounds.model';

export class RoundsActions {
    static SAVE = '[Rounds] SAVE';

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
