import {TestBed} from '@angular/core/testing';

import {FormControlErrorsService} from './form-control-errors.service';


describe('FormControlErrorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormControlErrorsService = TestBed.get(FormControlErrorsService);
    expect(service).toBeTruthy();
  });
});
