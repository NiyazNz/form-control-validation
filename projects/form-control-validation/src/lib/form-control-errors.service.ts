import {Inject, Injectable, InjectionToken} from '@angular/core';


export interface FormControlErrors {
  [key: string]: (args) => string;
}


/**
 * Default error messages for builtin validators
 */
export function formControlErrorsFactory(): FormControlErrors {
  const _formErrors = {
    min: ({min, actual}) => `Expected is at least ${min} but got ${actual}`,
    max: ({max, actual}) => `Expected is at most ${max} but got ${actual}`,
    required: (error) => `This field is required`,
    requiredTrue: (error) => `This field is required`,
    email: (error) => `Invalid email`,
    minlength: ({requiredLength, actualLength}) => `Expected length is at least ${requiredLength} but got ${actualLength}`,
    maxlength: ({requiredLength, actualLength}) => `Expected length is at most ${requiredLength} but got ${actualLength}`,
    pattern: ({requiredPattern, actualValue}) => `Value does not match a required pattern: ${requiredPattern}`,
  };
  return _formErrors;
}


export const FORM_CONTROL_ERRORS = new InjectionToken<FormControlErrors>('Form control errors', {
  providedIn: 'root',
  factory: formControlErrorsFactory
});


@Injectable({
  providedIn: 'root'
})
export class FormControlErrorsService {
  constructor(@Inject(FORM_CONTROL_ERRORS) private formControlErrors: FormControlErrors) {
  }

  get(key: string, args) {
    const errorMessageFn = this.formControlErrors[key];
    if (errorMessageFn) {
      return errorMessageFn(args);
    }
    return key;
  }
}
