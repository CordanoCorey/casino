import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'casino-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {

  @Input() chipValue = 0;

  constructor() { }

  ngOnInit() {
  }

}
