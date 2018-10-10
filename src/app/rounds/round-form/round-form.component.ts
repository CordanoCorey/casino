import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SmartComponent, Control } from '@caiu/library';
import { Store } from '@ngrx/store';

import { Round } from '../rounds.model';
import { RoundsActions } from '../rounds.reducer';

@Component({
  selector: 'casino-round-form',
  templateUrl: './round-form.component.html',
  styleUrls: ['./round-form.component.scss']
})
export class RoundFormComponent extends SmartComponent implements OnInit {

  @Control(Round) form: FormGroup;

  constructor(public store: Store<any>) {
    super(store);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.dispatch(RoundsActions.save(this.form.value));
  }

}
