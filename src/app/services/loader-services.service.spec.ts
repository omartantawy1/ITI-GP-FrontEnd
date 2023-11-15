import { TestBed } from '@angular/core/testing';

import { LoaderServicesService } from './loader-services.service';

describe('LoaderServicesService', () => {
  let service: LoaderServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
