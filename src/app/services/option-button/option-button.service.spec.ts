import { TestBed } from '@angular/core/testing';

import { OptionButtonService } from './option-button.service';

describe('OptionButtonService', () => {
  let service: OptionButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
