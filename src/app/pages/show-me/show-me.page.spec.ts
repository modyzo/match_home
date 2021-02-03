/** */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMePage } from './show-me.page';

describe('ShowMePage', () => {
  let component: ShowMePage;
  let fixture: ComponentFixture<ShowMePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
