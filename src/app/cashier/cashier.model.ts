import { build } from '@caiu/library';

import { Totals } from '../shared/models';

export class Cashier {
    bankTotal = 0;
    chipTotal = 0;

    get totals(): Totals {
        return build(Totals, {
            bankTotal: this.bankTotal,
            chipTotal: this.chipTotal,
        });
    }

    get unitValue(): number {
        return this.totals.chipValue;
    }

    update(data: any): Cashier {
        return build(Cashier, this, data);
    }

}
