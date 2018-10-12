import { Component, OnInit, Input } from '@angular/core';
import { truthy } from '@caiu/library';

import { RouletteWheelSpin } from '../roulette.model';

@Component({
  selector: 'casino-roulette-spin-history',
  templateUrl: './roulette-spin-history.component.html',
  styleUrls: ['./roulette-spin-history.component.scss']
})
export class RouletteSpinHistoryComponent implements OnInit {

  @Input() spins: RouletteWheelSpin[] = [];

  constructor() { }

  get lastSpin(): RouletteWheelSpin {
    return this.spins.length > 0 ? this.spins[0] : null;
  }

  get black(): boolean {
    return truthy(this.lastSpin) && this.lastSpin.slotColor === 'Black';
  }

  get green(): boolean {
    return truthy(this.lastSpin) && this.lastSpin.slotColor === 'Green';
  }

  get red(): boolean {
    return truthy(this.lastSpin) && this.lastSpin.slotColor === 'Red';
  }

  ngOnInit() {
  }

  isBlack(spin: RouletteWheelSpin): boolean {
    return spin.slotColor === 'Black';
  }

  isGreen(spin: RouletteWheelSpin): boolean {
    return spin.slotColor === 'Green';
  }

  isRed(spin: RouletteWheelSpin): boolean {
    return spin.slotColor === 'Red';
  }

}
