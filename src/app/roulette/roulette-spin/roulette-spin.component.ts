import { Component, OnInit, Input } from '@angular/core';

import { RouletteWheelSpin } from '../roulette.model';

@Component({
  selector: 'casino-roulette-spin',
  templateUrl: './roulette-spin.component.html',
  styleUrls: ['./roulette-spin.component.scss']
})
export class RouletteSpinComponent implements OnInit {

  @Input() spin: RouletteWheelSpin;

  constructor() { }

  ngOnInit() {
  }

}
