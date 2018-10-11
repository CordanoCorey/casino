import { Component, OnInit, Input } from '@angular/core';

import { AuctionItem } from '../auction.model';

@Component({
  selector: 'casino-auction-item-preview',
  templateUrl: './auction-item-preview.component.html',
  styleUrls: ['./auction-item-preview.component.scss']
})
export class AuctionItemPreviewComponent implements OnInit {

  @Input() item: AuctionItem = new AuctionItem();
  @Input() order = 0;

  constructor() { }

  get backgroundImage(): string {
    switch (this.order % 4) {
      case 0:
        return 'assets/ace-of-spades.png';
      case 1:
        return 'assets/ace-of-hearts.png';
      case 2:
        return 'assets/ace-of-clubs.png';
      case 3:
        return 'assets/ace-of-diamonds.png';
    }
  }

  ngOnInit() {
  }

}
