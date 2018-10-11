import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionItemPreviewComponent } from './auction-item-preview.component';

describe('AuctionItemPreviewComponent', () => {
  let component: AuctionItemPreviewComponent;
  let fixture: ComponentFixture<AuctionItemPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionItemPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
