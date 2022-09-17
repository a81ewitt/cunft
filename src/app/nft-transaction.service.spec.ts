import { TestBed } from '@angular/core/testing';

import { NftTransactionService } from './nft-transaction.service';

describe('NftTransactionService', () => {
  let service: NftTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
