import { Collection, build, compareNumbers, Metadata } from '@caiu/library';

import { Totals } from '../shared/models';

export class Round {
    id = 0;
    totals: Totals = new Totals();

    get metadata(): Metadata {
        return build(Metadata, {
            ignore: [
                'cash',
                'chips',
                'ended',
                'endTime',
            ]
        });
    }

    get chipValue(): number {
        return this.totals.chipValue;
    }

    set chipValue(value: number) {
        this.totals.chipValue = value;
    }

    get ended(): boolean {
        return this.endTime < new Date();
    }

    get endTime(): Date {
        switch (this.id) {
            case 1:
                return new Date('October 13, 2018  18:06:00');
            case 2:
                return new Date('October 13, 2018  18:12:00');
            case 3:
                return new Date('October 13, 2018  18:18:00');
            case 4:
                return new Date('October 13, 2018  18:24:00');
            case 5:
                return new Date('October 13, 2018  18:30:00');
            case 6:
                return new Date('October 13, 2018  18:36:00');
            case 7:
                return new Date('October 13, 2018  18:42:00');
            case 8:
                return new Date('October 13, 2018  18:48:00');
            case 9:
                return new Date('October 13, 2018  18:54:00');
            case 10:
                return new Date('October 13, 2018  19:00:00');
            case 11:
                return new Date('October 13, 2018  19:06:00');
            case 12:
                return new Date('October 13, 2018  19:12:00');
            case 13:
                return new Date('October 13, 2018  19:18:00');
            case 14:
                return new Date('October 13, 2018  19:24:00');
            case 15:
                return new Date('October 13, 2018  19:30:00');
            case 16:
                return new Date('October 13, 2018  19:36:00');
            case 17:
                return new Date('October 13, 2018  19:42:00');
            case 18:
                return new Date('October 13, 2018  19:48:00');
            case 19:
                return new Date('October 13, 2018  19:54:00');
            case 20:
                return new Date('October 13, 2018  20:00:00');
            case 21:
                return new Date('October 13, 2018  20:06:00');
            case 22:
                return new Date('October 13, 2018  20:12:00');
            case 23:
                return new Date('October 13, 2018  20:18:00');
            case 24:
                return new Date('October 13, 2018  20:24:00');
            case 25:
                return new Date('October 13, 2018  20:30:00');
            case 26:
                return new Date('October 13, 2018  20:36:00');
            case 27:
                return new Date('October 13, 2018  20:42:00');
            case 28:
                return new Date('October 13, 2018  20:48:00');
            case 29:
                return new Date('October 13, 2018  20:54:00');
            case 30:
                return new Date('October 13, 2018  21:00:00');
            default:
                return new Date();
        }
    }

}

export class Rounds extends Collection<Round> {

    constructor() {
        super(Round);
        this.items = {
            0: build(Round, { id: 0, chipValue: 1 }),
            1: build(Round, { id: 1, chipValue: 1.001 }),
            2: build(Round, { id: 2, chipValue: 1.002 }),
            3: build(Round, { id: 3, chipValue: 1.02 }),
            4: build(Round, { id: 4, chipValue: 1.1 }),
            5: build(Round, { id: 5, chipValue: 1.11111 }),
            6: build(Round, { id: 6, chipValue: 1.2789 }),
            7: build(Round, { id: 7, chipValue: 1.34 }),
            8: build(Round, { id: 8, chipValue: 1.4 }),
            9: build(Round, { id: 9, chipValue: 1.5 }),
            10: build(Round, { id: 10, chipValue: 1 }),
            11: build(Round, { id: 11, chipValue: 1.001 }),
            12: build(Round, { id: 12, chipValue: 1.002 }),
            13: build(Round, { id: 13, chipValue: 1.02 }),
            14: build(Round, { id: 14, chipValue: 1.1 }),
            15: build(Round, { id: 15, chipValue: 1.11111 }),
            16: build(Round, { id: 16, chipValue: 1.2789 }),
            17: build(Round, { id: 17, chipValue: 1.34 }),
            18: build(Round, { id: 18, chipValue: 1.4 }),
            19: build(Round, { id: 19, chipValue: 1.5 }),
            20: build(Round, { id: 20, chipValue: 1 }),
            21: build(Round, { id: 21, chipValue: 1.001 }),
            22: build(Round, { id: 22, chipValue: 1.002 }),
            23: build(Round, { id: 23, chipValue: 1.02 }),
            24: build(Round, { id: 24, chipValue: 1.1 }),
            25: build(Round, { id: 25, chipValue: 1.11111 }),
            26: build(Round, { id: 26, chipValue: 1.2789 }),
            27: build(Round, { id: 27, chipValue: 1.34 }),
            28: build(Round, { id: 28, chipValue: 1.4 }),
            29: build(Round, { id: 29, chipValue: 1.5 }),
            30: build(Round, { id: 30, chipValue: 1 }),
        }
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
