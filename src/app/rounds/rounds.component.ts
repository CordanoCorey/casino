import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Round } from './rounds.model';
import { roundsHistorySelector } from './rounds.reducer';

@Component({
  selector: 'casino-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss']
})
export class RoundsComponent extends SmartComponent implements OnInit {
  colors = {
    0: 'green',
    1: 'red',
    2: 'black',
    3: 'red',
    4: 'black',
    5: 'red',
    6: 'black',
    7: 'red',
    8: 'black',
    9: 'red',
    10: 'green',
    11: 'black',
    12: 'red',
    13: 'black',
    14: 'red',
    15: 'black',
    16: 'red',
    17: 'black',
    18: 'red',
    19: 'black',
    20: 'green',
    21: 'red',
    22: 'black',
    23: 'red',
    24: 'black',
    25: 'red',
    26: 'black',
    27: 'red',
    28: 'black',
    29: 'red',
    30: 'green',
  };
  rounds$: Observable<Round[]>;

  constructor(public store: Store<any>) {
    super(store);
    this.rounds$ = roundsHistorySelector(store);
  }

  ngOnInit() {
    this.rounds$.subscribe(x => { console.dir(x); });
  }

}
