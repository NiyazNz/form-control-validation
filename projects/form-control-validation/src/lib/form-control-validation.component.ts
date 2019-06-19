import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {FormControlErrorsService} from './form-control-errors.service';


export interface IFormControlValidationComponent {
  name?: string;
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
  @Input() name?: string;
  firstErrorText: string;
  private _errors: ValidationErrors;

  @Input() set errors(value: ValidationErrors) {
    this._errors = value;

    const [key, args] = Object.entries(this._errors)[0];
    this.firstErrorText = this.formControlErrorsService.get(key, args);
  }

  constructor(private formControlErrorsService: FormControlErrorsService) {
  }

}
