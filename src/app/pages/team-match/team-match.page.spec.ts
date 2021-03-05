/** */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMatchPage } from './team-match.page';

describe('TeamMatchPage', () => {
  let component: TeamMatchPage;
  let fixture: ComponentFixture<TeamMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMatchPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
