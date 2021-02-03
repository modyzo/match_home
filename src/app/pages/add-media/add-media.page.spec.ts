/** */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMediaPage } from './add-media.page';

describe('AddMediaPage', () => {
  let component: AddMediaPage;
  let fixture: ComponentFixture<AddMediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMediaPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
