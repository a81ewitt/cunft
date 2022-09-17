import { TestBed } from '@angular/core/testing';

import { NftCreateService } from './nft-create.service';

describe('NftCreateService', () => {
  let service: NftCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
