import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {FormControlErrors, FormControlErrorsService} from './form-control-errors.service';


export interface IFormControlValidationComponent {
  name?: string;
  errorMessages?: FormControlErrors;
  errors: ValidationErrors;
}


/**
 * Default FormControl Validation Component
 *
 * Renders first error as user friendly message
 */
@Component({
  selector: 'nz-form-control-validation',
  template: `<small class="form-text text-danger">{{errorText}}</small>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlValidationComponent implements IFormControlValidationComponent {
  private _errors: ValidationErrors;
  errorText: string;
  /**
   * User defined error messages
   */
  @Input() errorMessages: FormControlErrors = {};
  /**
   * Form control name
   */
  @Input() name?: string;

  /**
   * Form control errors
   */
  @Input() set errors(value: ValidationErrors) {
    this._errors = value;

    const [key, args] = Object.entries(this._errors)[0];
    this.errorText = this.formControlErrorsService.get(key, args, this.errorMessages);
  }

  get errors(): ValidationErrors {
    return this._errors;
  }

  constructor(private formControlErrorsService: FormControlErrorsService) {
  }

}
