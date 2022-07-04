import { TestBed } from '@angular/core/testing';

import { FailureInterceptorService } from './failure-interceptor.service';

describe('FailureInterceptorService', () => {
  let service: FailureInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FailureInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
