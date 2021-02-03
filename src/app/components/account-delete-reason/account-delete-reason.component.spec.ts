/** */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeleteReasonComponent } from './account-delete-reason.component';

describe('AccountDeleteReasonComponent', () => {
  let component: AccountDeleteReasonComponent;
  let fixture: ComponentFixture<AccountDeleteReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDeleteReasonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDeleteReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
