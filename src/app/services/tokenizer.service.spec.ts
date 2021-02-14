import { TestBed } from '@angular/core/testing';

import { TokenizerService } from './tokenizer.service';

describe('AuthService', () => {
  let service: TokenizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
