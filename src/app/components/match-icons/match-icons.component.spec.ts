/** */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchIconsComponent } from './match-icons.component';

describe('MatchIconsComponent', () => {
  let component: MatchIconsComponent;
  let fixture: ComponentFixture<MatchIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchIconsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
