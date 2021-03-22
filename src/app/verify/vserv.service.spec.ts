import { TestBed } from '@angular/core/testing';

import { VservService } from './vserv.service';

describe('VservService', () => {
  let service: VservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
