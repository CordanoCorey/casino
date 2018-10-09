import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'casino-roulette-wheel',
  templateUrl: './roulette-wheel.component.html',
  styleUrls: ['./roulette-wheel.component.scss']
})
export class RouletteWheelComponent implements OnInit {

  @Input() ballPositionLeft = 0;
  @Input() ballPositionTop = 0;
  @Input() centerPositionLeft = 0;
  @Input() centerPositionTop = 0;
  @Input() diameter = 0;
  @Input() offsetLeft = 0;
  @Input() offsetTop = 0;
  @Input() started = false;
  @Output() startSpin = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
