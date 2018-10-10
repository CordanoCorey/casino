import { Component, OnInit, Input } from '@angular/core';

import { RouletteWheelSpin } from '../roulette.model';

@Component({
  selector: 'casino-roulette-spin-distribution',
  templateUrl: './roulette-spin-distribution.component.html',
  styleUrls: ['./roulette-spin-distribution.component.scss']
})
export class RouletteSpinDistributionComponent implements OnInit {

  colors = {
    '00': 'green',
    '0': 'green',
    '1': 'red',
    '2': 'black',
    '3': 'red',
    '4': 'black',
    '5': 'red',
    '6': 'black',
    '7': 'red',
    '8': 'black',
    '9': 'red',
    '10': 'black',
    '11': 'black',
    '12': 'red',
    '13': 'black',
    '14': 'red',
    '15': 'black',
    '16': 'red',
    '17': 'black',
    '18': 'red',
    '19': 'red',
    '20': 'black',
    '21': 'red',
    '22': 'black',
    '23': 'red',
    '24': 'black',
    '25': 'red',
    '26': 'black',
    '27': 'red',
    '28': 'black',
    '29': 'black',
    '30': 'red',
    '31': 'black',
    '32': 'red',
    '33': 'black',
    '34': 'red',
    '35': 'black',
    '36': 'red'
  };
  newSpinCounts = {
    '00': 0,
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0,
    '13': 0,
    '14': 0,
    '15': 0,
    '16': 0,
    '17': 0,
    '18': 0,
    '19': 0,
    '20': 0,
    '21': 0,
    '22': 0,
    '23': 0,
    '24': 0,
    '25': 0,
    '26': 0,
    '27': 0,
    '28': 0,
    '29': 0,
    '30': 0,
    '31': 0,
    '32': 0,
    '33': 0,
    '34': 0,
    '35': 0,
    '36': 0
  };
  spinCounts = {};
  _spins: RouletteWheelSpin[] = [];

  constructor() { }

  @Input() set spins(value: RouletteWheelSpin[]) {
    this._spins = value;
    this.spinCounts = {};
    value.forEach(x => {
      const count = this.spinCounts[x.slotNumber] || 0;
      this.spinCounts[x.slotNumber] = count + 1;
    });
  }

  get spins(): RouletteWheelSpin[] {
    return this._spins;
  }

  get spinCountArray(): any[] {
    return Object.keys(this.spinCounts).map(key => {
      return {
        number: key,
        count: this.spinCounts[key]
      };
    });
  }

  ngOnInit() {
  }

}
