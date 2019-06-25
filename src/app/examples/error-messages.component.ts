import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NzValidators} from './validators';
import {FormControlErrors} from '@enzedd/form-control-validation';


const EXAMPLE_HTML = `
<input type="text" class="form-control" id="username" placeholder="Username"
       formControlName="username"
       nzFormControlValidation
       requiredError="Username field is required"
       minlengthError="Too short"
       maxlengthError="Too long"
       patternError="Username should start from letter and contain only alphanumeric characters"
       [validatorErrors]="extraValidatorErrors"
>`;
const EXAMPLE_TS = `
import {FormControlErrors} from '@enzedd/form-control-validation';

export class ErrorMessagesComponent {
  extraValidatorErrors: FormControlErrors = {
    notEquals: ({value}) => \`$\{value\} cannot be used\`,  // function
    // notEquals: 'This value cannot be used',  // or string
  };
  ...
}`;


@Component({
  selector: 'app-error-messages',
  template: `
      <p>Try to set 'admin' or any value to see validation errors</p>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" id="username" placeholder="Username"
                     formControlName="username"
                     nzFormControlValidation
                     requiredError="Username field is required"
                     minlengthError="Too short"
                     maxlengthError="Too long"
                     patternError="Username should start from letter and contain only alphanumeric characters"
                     [validatorErrors]="extraValidatorErrors"
              >
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
      </form>
      <hr>

      <p>Add <strong>nzFormControlValidation</strong> directive and error messages using predefined input values to form
          control (input). These messages have higher priority than global configuration and used for per formControl
          overrides. If error messages not specified, messages from global configuration will be used.</p>
      <p>For user defined validators <strong>validatorErrors</strong> input can be used.</p>
      <code lang="html" [code]="exampleHtml"></code>
      <code lang="typescript" [code]="exampleTs"></code>
      <dl class="row">
          <dt class="col-sm-3">minError</dt>
          <dd class="col-sm-9">Error message for Validators.min</dd>
          <dt class="col-sm-3">maxError</dt>
          <dd class="col-sm-9">Error message for Validators.max</dd>
          <dt class="col-sm-3">requiredError</dt>
          <dd class="col-sm-9">Error message for Validators.required</dd>
          <dt class="col-sm-3">requiredTrueError</dt>
          <dd class="col-sm-9">Error message for Validators.requiredTrue</dd>
          <dt class="col-sm-3">emailError</dt>
          <dd class="col-sm-9">Error message for Validators.email</dd>
          <dt class="col-sm-3">minlengthError</dt>
          <dd class="col-sm-9">Error message for Validators.minlength</dd>
          <dt class="col-sm-3">maxlengthError</dt>
          <dd class="col-sm-9">Error message for Validators.maxlength</dd>
          <dt class="col-sm-3">patternError</dt>
          <dd class="col-sm-9">Error message for Validators.pattern</dd>
          <dt class="col-sm-3">validatorErrors</dt>
          <dd class="col-sm-9">Error messages for other validators. Has lower priority than more specific error messages
              and can be overwritten by them
          </dd>
      </dl>
  `,
})
export class ErrorMessagesComponent {
  exampleHtml = EXAMPLE_HTML;
  exampleTs = EXAMPLE_TS;

  extraValidatorErrors: FormControlErrors = {
    requiredError: 'You will see more specific error defined in requiredError input as it has higher priority',
    notEquals: ({value}) => `${value} cannot be used`,  // function
    // notEquals: 'This value cannot be used',  // or string
  };

  form = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.pattern(/[a-z]\w*/),
      Validators.minLength(3),
      Validators.maxLength(10),
      NzValidators.notEquals(['admin', 'administrator'])
    ]],
  }, /*{updateOn: 'blur'}*/);

  constructor(protected fb: FormBuilder) {
  }

  onSubmit() {
    if (this.form.valid) {
      alert('Form submitted');
    }
  }
}
