import { Metadata, build } from '@caiu/library';

export class Totals {
    bankTotal = 0;
    chipTotal = 0;

    get unitValue(): number {
        return this.bankTotal / this.chipTotal;
    }

    get metadata(): Metadata {
        return build(Metadata, {
            ignore: [
                'unitValue',
            ]
        });
    }

}
