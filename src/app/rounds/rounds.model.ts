import { Collection, build, compareNumbers } from '@caiu/library';

import { Totals } from '../shared/models';

export class Round {
    id = 0;
    totals: Totals = new Totals();

    get chipValue(): number {
        return this.totals.chipValue;
    }

    set chipValue(value: number) {

    }

}

export class Rounds extends Collection<Round> {

    constructor() {
        super(Round);
        this.items = {
            0: build(Round, { id: 0, chipValue: .01 })
        };
    }

    get currentRound(): Round {
        const lastRound = this.lastRound;
        return build(Round, {
            id: lastRound.id + 1,
            totals: lastRound.totals,
        });
    }

    get lastRound(): Round {
        return this.roundsDesc[0];
    }

    get roundsDesc(): Round[] {
        return this.asArray.sort((a, b) => compareNumbers(-a.id, -b.id));
    }

    update(data: Round | Round[]): Rounds {
        return build(Rounds, super.update(data));
    }

}
