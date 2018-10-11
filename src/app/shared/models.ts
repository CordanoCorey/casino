import { Metadata, build } from '@caiu/library';

export class Totals {
    bankTotal = 0;
    chipTotal = 0;
    _chipValue = 0;

    get chipValue(): number {
        return this.chipTotal === 0 ? this._chipValue : this.bankTotal / this.chipTotal;
    }

    set chipValue(value: number) {
        this._chipValue = value;
    }

    get metadata(): Metadata {
        return build(Metadata, {
            ignore: [
                '_chipValue',
                'chipValue',
            ]
        });
    }

}
