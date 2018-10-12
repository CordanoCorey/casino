import { Component, OnInit, Input } from '@angular/core';
import { truthy } from '@caiu/library';

import { RouletteWheelSpin } from '../roulette.model';

@Component({
  selector: 'casino-roulette-spin',
  templateUrl: './roulette-spin.component.html',
  styleUrls: ['./roulette-spin.component.scss']
})
export class RouletteSpinComponent implements OnInit {

  @Input() spin: RouletteWheelSpin = new RouletteWheelSpin();

  constructor() { }

  get black(): boolean {
    return truthy(this.spin) && this.spin.slotColor === 'Black';
  }

  get green(): boolean {
    return truthy(this.spin) && this.spin.slotColor === 'Green';
  }

  get red(): boolean {
    return truthy(this.spin) && this.spin.slotColor === 'Red';
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
