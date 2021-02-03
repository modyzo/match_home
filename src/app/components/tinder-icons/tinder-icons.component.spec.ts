/** */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderIconsComponent } from './tinder-icons.component';

describe('TinderIconsComponent', () => {
  let component: TinderIconsComponent;
  let fixture: ComponentFixture<TinderIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TinderIconsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinderIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
