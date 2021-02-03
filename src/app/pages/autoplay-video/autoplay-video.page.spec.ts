/** */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoplayVideoPage } from './autoplay-video.page';

describe('AutoplayVideoPage', () => {
  let component: AutoplayVideoPage;
  let fixture: ComponentFixture<AutoplayVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoplayVideoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoplayVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
