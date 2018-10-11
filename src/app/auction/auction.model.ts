import { Collection, build, Metadata } from '@caiu/library';

export class AuctionItem {
    id = 0;
    endTime: Date = new Date();
    imageSrc = '';
    name = '';
    round = 0;
    salePriceCash = 0;
    salePriceChips = 0;
    startPriceCash = 0;
    startPriceChips = 0;

    get metadata(): Metadata {
        return build(Metadata, {
            ignore: [
                'cash',
                'chips',
                'ended',
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
            1: build(AuctionItem, { id: 1, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:06:00') }),
            2: build(AuctionItem, { id: 2, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:12:00') }),
            3: build(AuctionItem, { id: 3, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:18:00') }),
            4: build(AuctionItem, { id: 4, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:24:00') }),
            5: build(AuctionItem, { id: 5, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:30:00') }),
            6: build(AuctionItem, { id: 6, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:36:00') }),
            7: build(AuctionItem, { id: 7, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:42:00') }),
            8: build(AuctionItem, { id: 8, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:48:00') }),
            9: build(AuctionItem, { id: 9, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  18:54:00') }),
            10: build(AuctionItem, { id: 10, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:00:00') }),
            11: build(AuctionItem, { id: 11, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:06:00') }),
            12: build(AuctionItem, { id: 12, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:12:00') }),
            13: build(AuctionItem, { id: 13, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:18:00') }),
            14: build(AuctionItem, { id: 14, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:24:00') }),
            15: build(AuctionItem, { id: 15, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:30:00') }),
            16: build(AuctionItem, { id: 16, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:36:00') }),
            17: build(AuctionItem, { id: 17, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:42:00') }),
            18: build(AuctionItem, { id: 18, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:48:00') }),
            19: build(AuctionItem, { id: 19, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  19:54:00') }),
            20: build(AuctionItem, { id: 20, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:00:00') }),
            21: build(AuctionItem, { id: 21, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:06:00') }),
            22: build(AuctionItem, { id: 22, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:12:00') }),
            23: build(AuctionItem, { id: 23, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:18:00') }),
            24: build(AuctionItem, { id: 24, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:24:00') }),
            25: build(AuctionItem, { id: 25, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:30:00') }),
            26: build(AuctionItem, { id: 26, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:36:00') }),
            27: build(AuctionItem, { id: 27, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:42:00') }),
            28: build(AuctionItem, { id: 28, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:48:00') }),
            29: build(AuctionItem, { id: 29, name: 'Baby Pink Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  20:54:00') }),
            30: build(AuctionItem, { id: 30, name: 'Baby Blue Chip', startPriceChips: 100, endTime: new Date('October 13, 2018  21:00:00') }),
        };
    }

    update(data: AuctionItem | AuctionItem[]): Auction {
        return build(Auction, data);
    }

}
