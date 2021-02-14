import { TestBed } from '@angular/core/testing';

import { AddTokenInterceptorsService } from './add-token-interceptors.service';

describe('AddTokenInterceptorsService', () => {
  let service: AddTokenInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTokenInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
