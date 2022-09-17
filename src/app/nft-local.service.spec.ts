import { TestBed } from '@angular/core/testing';

import { NftLocalService } from './nft-local.service';

describe('NftLocalService', () => {
  let service: NftLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
