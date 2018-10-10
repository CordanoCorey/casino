import { Collection, build } from '@caiu/library';

export class AuctionItem {

}

export class Auction extends Collection<AuctionItem> {
    constructor() {
        super(AuctionItem);
    }

    update(data: AuctionItem | AuctionItem[]): Auction {
        return build(Auction, data);
    }

}
