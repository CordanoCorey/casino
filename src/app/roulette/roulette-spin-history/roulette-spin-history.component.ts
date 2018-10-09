import { Component, OnInit, Input } from '@angular/core';

import { RouletteWheelSpin } from '../roulette.model';

@Component({
  selector: 'casino-roulette-spin-history',
  templateUrl: './roulette-spin-history.component.html',
  styleUrls: ['./roulette-spin-history.component.scss']
})
export class RouletteSpinHistoryComponent implements OnInit {

  @Input() spins: RouletteWheelSpin[] = [];

  constructor() { }

  ngOnInit() {
  }

}
