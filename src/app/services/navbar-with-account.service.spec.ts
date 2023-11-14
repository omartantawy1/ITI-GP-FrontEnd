import { TestBed } from '@angular/core/testing';

import { NavbarWithAccountService } from './navbar-with-account.service';

describe('NavbarWithAccountService', () => {
  let service: NavbarWithAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarWithAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
