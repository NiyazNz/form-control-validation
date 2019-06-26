import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NzValidators} from './validators';
import {FormControlErrors} from '../../../projects/form-control-validation/src/lib/form-control-errors.service';


const EXAMPLE_HTML = `
<form [formGroup]="form" (ngSubmit)="onSubmit()"  nzFormControlValidation [validatorErrors]="extraMessages">
    ...
</form>`;


@Component({
  selector: 'app-form-error',
  template: `
      <p>Set the same value for input fields to see form validation errors</p>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" nzFormControlValidation [validatorErrors]="extraValidatorErrors">
          <div class="form-group">
              <label for="username">Public username</label>
              <input type="text" class="form-control" id="username" placeholder="Public username"
                     formControlName="username"
                     nzFormControlValidation
              >
          </div>
          <div class="form-group">
              <label for="secret-name">Secret name</label>
              <input type="text" class="form-control" id="secret-name" placeholder="Secret name"
                     formControlName="secretName"
                     nzFormControlValidation
              >
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
      </form>

      <hr>
      <p>Add <strong>nzFormControlValidation</strong> directive to form</p>
      <div lang="html" [code]="exampleHtml"></div>
  `,
})
export class FormErrorComponent {
  exampleHtml = EXAMPLE_HTML;

  form = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.pattern(/[a-z]\w*/),
      Validators.minLength(3),
      Validators.maxLength(10)
    ]],
    secretName: ['', [
      Validators.required,
      Validators.pattern(/[a-z]\w*/),
      Validators.minLength(3),
      Validators.maxLength(10)
    ]],
  }, {
    validators: NzValidators.fieldsCannotMatchValidator('username', 'secretName'),
    // updateOn: 'blur'
  });

  extraValidatorErrors: FormControlErrors = {
    fieldsCannotMatch: ({field1, field2}) => `Fields ${field1} and ${field2} can not match`,
  };

  constructor(protected fb: FormBuilder) {
  }

  onSubmit() {
    if (this.form.valid) {
      alert('Form submitted');
    }
  }

}
