import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionItemFormComponent } from './auction-item-form.component';

describe('AuctionItemFormComponent', () => {
  let component: AuctionItemFormComponent;
  let fixture: ComponentFixture<AuctionItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
