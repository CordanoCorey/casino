import { AuctionModule } from './auction.module';

describe('AuctionModule', () => {
  let auctionModule: AuctionModule;

  beforeEach(() => {
    auctionModule = new AuctionModule();
  });

  it('should create an instance', () => {
    expect(auctionModule).toBeTruthy();
  });
});
