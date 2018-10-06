import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipValuesComponent } from './chip-values.component';

describe('ChipValuesComponent', () => {
  let component: ChipValuesComponent;
  let fixture: ComponentFixture<ChipValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
