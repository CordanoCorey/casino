export class Cashier {
    bankTotal = 0;
    chipTotal = 0;

    get unitValue(): number {
        return this.bankTotal / this.chipTotal;
    }

}
