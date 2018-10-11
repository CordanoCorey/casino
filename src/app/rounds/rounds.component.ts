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

  rounds$: Observable<Round[]>;

  constructor(public store: Store<any>) {
    super(store);
    this.rounds$ = roundsHistorySelector(store);
  }

  ngOnInit() {
  }

}
