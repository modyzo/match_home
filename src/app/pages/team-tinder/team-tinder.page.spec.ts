/** */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTinderPage } from './team-tinder.page';

describe('TeamTinderPage', () => {
  let component: TeamTinderPage;
  let fixture: ComponentFixture<TeamTinderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamTinderPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
