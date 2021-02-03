/** */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPopoverComponent } from './feed-popover.component';

describe('FeedPopoverComponent', () => {
  let component: FeedPopoverComponent;
  let fixture: ComponentFixture<FeedPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedPopoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
