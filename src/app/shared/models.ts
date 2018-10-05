import { Metadata, build } from '@caiu/library';

export class Totals {
    bankTotal = 0;
    chipTotal = 0;

    get chipValue(): number {
        return this.chipTotal === 0 ? 0 : this.bankTotal / this.chipTotal;
    }

    get metadata(): Metadata {
        return build(Metadata, {
            ignore: [
                'chipValue',
            ]
        });
    }

}
