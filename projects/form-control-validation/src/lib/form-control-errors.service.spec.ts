import {TestBed} from '@angular/core/testing';

import {FORM_CONTROL_ERRORS, FormControlErrorsService} from './form-control-errors.service';


describe('FormControlErrorsService', () => {
    let service: FormControlErrorsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormControlErrorsService
            ],
        });
        service = TestBed.get(FormControlErrorsService);
    });

    it('should contain error messages for angular builtin validators', () => {
        expect(service.get('min')).toBeTruthy();
        expect(service.get('max')).toBeTruthy();
        expect(service.get('required')).toBeTruthy();
        expect(service.get('requiredTrue')).toBeTruthy();
        expect(service.get('email')).toBeTruthy();
        expect(service.get('minlength')).toBeTruthy();
        expect(service.get('maxlength')).toBeTruthy();
        expect(service.get('pattern')).toBeTruthy();
    });

    it('should get error message from global config (str)', () => {
        expect(service.get('required')).toBe('This field is required');
    });

    it('should get error message from global config (function)', () => {
        expect(service.get('minlength', {
            requiredLength: 3,
            actualLength: 1
        })).toBe('Expected length is at least 3 but got 1');
    });

    it('should get error message from local overrides', () => {
        expect(service.get('required', null, {required: 'Required field'})).toBe('Required field');
    });

    it('should return key if not exist', () => {
        expect(service.get('noKey')).toBe('noKey');
    });
});

describe('FORM_CONTROL_ERRORS', () => {
    let service: FormControlErrorsService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: FORM_CONTROL_ERRORS, useFactory: () => {
                        return {provided: 'provided error message'};
                    }
                },
                FormControlErrorsService
            ],
        });
        service = TestBed.get(FormControlErrorsService);
    });

    it('should get error message from provided factory', () => {
        expect(service.get('provided')).toBe('provided error message');
    });
});
