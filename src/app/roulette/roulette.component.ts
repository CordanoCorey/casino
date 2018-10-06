import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'casino-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent implements OnInit {

  spinning = false;

  constructor() { }

  get noMoreBets(): boolean {
    return false;
  }

  ngOnInit() {
  }

  spin() {
    this.spinning = true;
  }

  stop() {
    this.spinning = false;
  }

  toggle() {
    this.spinning = !this.spinning;
  }

}
