import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, DumbComponent, build } from '@caiu/library';

import { Totals } from '../models';

@Component({
  selector: 'casino-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent extends DumbComponent implements OnInit {

  @Control(Totals) form: FormGroup;
  @Output() save = new EventEmitter<Totals>();

  constructor() {
    super();
  }

  @Input() set totals(value: Totals) {
    this.setValue(value);
  }

  get totals(): Totals {
    return build(Totals, this.form.value);
  }

  get showSave(): boolean {
    return this.form.touched && this.form.valid;
  }

  ngOnInit() {
  }

  onSave() {
    this.save.emit(this.totals);
  }

}
