import { TestBed } from '@angular/core/testing';

import { NgxThemeProviderService } from './ngx-theme-provider.service';

describe('NgxThemeProviderService', () => {
  let service: NgxThemeProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxThemeProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
