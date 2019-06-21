import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {FormControlErrorsService} from './form-control-errors.service';


export interface IFormControlValidationComponent {
  name?: string;
  errorMessages?: { [key: string]: string };
  errors: ValidationErrors;
}


/**
 * Default FormControl Validation Component
 *
 * Renders first error as user friendly message
 */
@Component({
  selector: 'nz-form-control-validation',
  template: `<small class="form-text text-danger">{{firstErrorText}}</small>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlValidationComponent implements IFormControlValidationComponent {
  private _errors: ValidationErrors;
  firstErrorText: string;
  /**
   * User defined error messages
   */
  @Input() errorMessages = {};
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
    this.firstErrorText = this.errorMessages[key] ? this.errorMessages[key] : this.formControlErrorsService.get(key, args);
  }

  get errors(): ValidationErrors {
    return this._errors;
  }

  constructor(private formControlErrorsService: FormControlErrorsService) {
  }

}
