import {Inject, Injectable, InjectionToken} from '@angular/core';


export interface FormControlErrors {
  [key: string]: string | ((args) => string);
}


/**
 * Default error messages for builtin validators
 */
export function formControlErrorsFactory(): FormControlErrors {
  const _formErrors = {
    min: ({min, actual}) => `Expected is at least ${min} but got ${actual}`,
    max: ({max, actual}) => `Expected is at most ${max} but got ${actual}`,
    required: 'This field is required',
    requiredTrue: 'This field is required',
    email: 'Invalid email',
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

  /**
   * Get messages from overrides or global configuration or return key as a fallback
   */
  get(key: string, args?, overrides?: FormControlErrors) {
    let errorMessageOrFn;
    if (overrides) {
      errorMessageOrFn = overrides[key];
    }
    if (!errorMessageOrFn) {
      errorMessageOrFn = this.formControlErrors[key];
    }
    if (!errorMessageOrFn) {
      return key;
    }
    if (errorMessageOrFn instanceof Function) {
      return errorMessageOrFn(args || {});
    }
    return errorMessageOrFn;
  }
}
