import { build } from '@caiu/library';

import { AuctionItem } from '../auction/auction.model';
import { Totals } from '../shared/models';

export class Cashier {
    cashTotal = 195;
    chipTotal = 19500;

    get totals(): Totals {
        return build(Totals, {
            cashTotal: this.cashTotal,
            chipTotal: this.chipTotal,
        });
    }

    get unitValue(): number {
        return this.totals.chipValue;
    }

    addTransaction(data: Transaction): Cashier {
        return build(Cashier, this, {
            cashTotal: this.cashTotal + data.cashTotal,
            chipTotal: this.chipTotal + data.chipTotal,
        });
    }

    saveAuctionItem(data: AuctionItem): Cashier {
        return data.paid ? build(Cashier, this, {
            cashTotal: data.cash ? this.cashTotal + data.salePriceCash : this.cashTotal,
            chipTotal: data.chips ? this.chipTotal - data.salePriceChips : this.chipTotal,
        }) : this;
    }

    update(data: any): Cashier {
        return build(Cashier, this, data);
    }

}

export class Transaction {
    cashTotal = 0;
    chipTotal = 0;
}
