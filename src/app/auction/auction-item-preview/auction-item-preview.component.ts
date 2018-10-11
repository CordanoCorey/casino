import { Component, OnInit, Input } from '@angular/core';

import { AuctionItem } from '../auction.model';

@Component({
  selector: 'casino-auction-item-preview',
  templateUrl: './auction-item-preview.component.html',
  styleUrls: ['./auction-item-preview.component.scss']
})
export class AuctionItemPreviewComponent implements OnInit {

  @Input() item: AuctionItem = new AuctionItem();
  backgroundImage = 'assets/ace-of-spades.png';

  constructor() { }

  ngOnInit() {
  }

}
