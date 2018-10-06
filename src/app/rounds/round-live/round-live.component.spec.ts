import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundLiveComponent } from './round-live.component';

describe('RoundLiveComponent', () => {
  let component: RoundLiveComponent;
  let fixture: ComponentFixture<RoundLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
