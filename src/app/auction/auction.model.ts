import { Collection, build, Metadata } from '@caiu/library';

export class AuctionItem {
    id = 0;
    endTime: Date = new Date();
    name = '';
    round = 0;
    salePriceCash = 0;
    salePriceChips = 0;
    startPriceCash = 0;
    startPriceChips = 0;
    _imageSrc = '';

    get metadata(): Metadata {
        return build(Metadata, {
            ignore: [
                '_imageSrc',
                'cash',
                'chips',
                'ended',
                'imageSrc',
                'paid',
                'round',
                'salePrice',
                'startPrice',
            ]
        });
    }

    get cash(): boolean {
        return this.startPriceCash > 0;
    }

    get chips(): boolean {
        return this.startPriceChips > 0;
    }

    get ended(): boolean {
        return this.endTime < new Date();
    }

    set imageSrc(value: string) {
        this._imageSrc = value;
    }

    get imageSrc(): string {
        return this._imageSrc || 'assets/auction-item.png';
    }

    get paid(): boolean {
        return this.salePriceCash > 0 || this.salePriceChips > 0;
    }

    get salePrice(): number {
        return this.salePriceCash || this.salePriceChips;
    }

    get startPrice(): number {
        return this.startPriceCash || this.startPriceChips;
    }

}

export class Auction extends Collection<AuctionItem> {

    static StartTime(dateString: string, hours: number, minutes: number): Date {
        const date = new Date(dateString);
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    }

    constructor() {
        super(AuctionItem);
        this.items = {
            1: build(AuctionItem, { id: 1, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:06:00'), imageSrc: 'assets/pink.jpg' }),
            2: build(AuctionItem, { id: 2, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:12:00'), imageSrc: 'assets/baby-blue.jpg' }),
            3: build(AuctionItem, { id: 3, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:18:00'), imageSrc: 'assets/pink.jpg' }),
            4: build(AuctionItem, { id: 4, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:24:00'), imageSrc: 'assets/baby-blue.jpg' }),
            5: build(AuctionItem, { id: 5, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:30:00'), imageSrc: 'assets/pink.jpg' }),
            6: build(AuctionItem, { id: 6, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:36:00'), imageSrc: 'assets/baby-blue.jpg' }),
            7: build(AuctionItem, { id: 7, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:42:00'), imageSrc: 'assets/pink.jpg' }),
            8: build(AuctionItem, { id: 8, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:48:00'), imageSrc: 'assets/baby-blue.jpg' }),
            9: build(AuctionItem, { id: 9, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:54:00'), imageSrc: 'assets/pink.jpg' }),
            10: build(AuctionItem, { id: 10, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:00:00'), imageSrc: 'assets/baby-blue.jpg' }),
            11: build(AuctionItem, { id: 11, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:06:00'), imageSrc: 'assets/pink.jpg' }),
            12: build(AuctionItem, { id: 12, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:12:00'), imageSrc: 'assets/baby-blue.jpg' }),
            13: build(AuctionItem, { id: 13, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:18:00'), imageSrc: 'assets/pink.jpg' }),
            14: build(AuctionItem, { id: 14, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:24:00'), imageSrc: 'assets/baby-blue.jpg' }),
            15: build(AuctionItem, { id: 15, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:30:00'), imageSrc: 'assets/pink.jpg' }),
            16: build(AuctionItem, { id: 16, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:36:00'), imageSrc: 'assets/baby-blue.jpg' }),
            17: build(AuctionItem, { id: 17, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:42:00'), imageSrc: 'assets/pink.jpg' }),
            18: build(AuctionItem, { id: 18, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:48:00'), imageSrc: 'assets/baby-blue.jpg' }),
            19: build(AuctionItem, { id: 19, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:54:00'), imageSrc: 'assets/pink.jpg' }),
            20: build(AuctionItem, { id: 20, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:00:00'), imageSrc: 'assets/baby-blue.jpg' }),
            21: build(AuctionItem, { id: 21, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:06:00'), imageSrc: 'assets/pink.jpg' }),
            22: build(AuctionItem, { id: 22, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:12:00'), imageSrc: 'assets/baby-blue.jpg' }),
            23: build(AuctionItem, { id: 23, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:18:00'), imageSrc: 'assets/pink.jpg' }),
            24: build(AuctionItem, { id: 24, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:24:00'), imageSrc: 'assets/baby-blue.jpg' }),
            25: build(AuctionItem, { id: 25, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:30:00'), imageSrc: 'assets/pink.jpg' }),
            26: build(AuctionItem, { id: 26, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:36:00'), imageSrc: 'assets/baby-blue.jpg' }),
            27: build(AuctionItem, { id: 27, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:42:00'), imageSrc: 'assets/pink.jpg' }),
            28: build(AuctionItem, { id: 28, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:48:00'), imageSrc: 'assets/baby-blue.jpg' }),
            29: build(AuctionItem, { id: 29, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:54:00'), imageSrc: 'assets/pink.jpg' }),
            30: build(AuctionItem, { id: 30, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  21:00:00'), imageSrc: 'assets/baby-blue.jpg' }),
            31: build(AuctionItem, { id: 31, name: 'Boy Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/boy-glasses.PNG' }),
            32: build(AuctionItem, { id: 32, name: 'Boy Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/boy-glasses.PNG' }),
            33: build(AuctionItem, { id: 33, name: 'Boy Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/boy-glasses.PNG' }),
            34: build(AuctionItem, { id: 34, name: 'Boy Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/boy-glasses.PNG' }),
            35: build(AuctionItem, { id: 35, name: 'Boy Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/boy-glasses.PNG' }),
            36: build(AuctionItem, { id: 36, name: 'Girl Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/girl-glasses.PNG' }),
            37: build(AuctionItem, { id: 37, name: 'Girl Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/girl-glasses.PNG' }),
            38: build(AuctionItem, { id: 38, name: 'Girl Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/girl-glasses.PNG' }),
            39: build(AuctionItem, { id: 39, name: 'Girl Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/girl-glasses.PNG' }),
            40: build(AuctionItem, { id: 40, name: 'Girl Glasses', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/girl-glasses.PNG' }),
            41: build(AuctionItem, { id: 41, name: 'Boy Hat', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/boy-hat.jpg' }),
            42: build(AuctionItem, { id: 42, name: 'Boy Hat', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/boy-hat.jpg' }),
            43: build(AuctionItem, { id: 43, name: 'Girl Hat', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/girl-hat.jpg' }),
            44: build(AuctionItem, { id: 44, name: 'Girl Hat', startPriceCash: 0.25, endTime: new Date('October 13, 2018  18:45:00'), imageSrc: 'assets/girl-hat.jpg' }),
        };
    }

    update(data: AuctionItem | AuctionItem[]): Auction {
        return build(Auction, super.update(data));
    }

}
