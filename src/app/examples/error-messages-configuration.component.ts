import {Component, NgModule} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FORM_CONTROL_ERRORS, FormControlErrors, FormControlValidationModule} from '@enzedd/form-control-validation';
import {BrowserModule} from '@angular/platform-browser';
import {CodeModule} from '../code/code.module';


const EXAMPLE_HTML = `
<input type="text" class="form-control" id="username" placeholder="Username"
       formControlName="username"
       nzFormControlValidation
>`;
const EXAMPLE_TS = `
import {FORM_CONTROL_ERRORS, FormControlErrors} from '@enzedd/form-control-validation';

export function formControlErrorsFactory(): FormControlErrors \{
  const _formErrors = \{
    min: (\{min, actual\}) => \`Expected is at least $\{min\} but got $\{actual\}!\`,
    max: (\{max, actual\}) => \`Expected is at most $\{max\} but got $\{actual\}!\`,
    required: (error) => \`This field is required!\`,
    requiredTrue: (error) => \`This field is required!\`,
    email: (error) => \`Invalid email!\`,
    minlength: (\{requiredLength, actualLength\}) => \`Expected length is at least $\{requiredLength\} but got $\{actualLength\}!\`,
    maxlength: (\{requiredLength, actualLength\}) => \`Expected length is at most $\{requiredLength\} but got $\{actualLength\}!\`,
    pattern: (\{requiredPattern, actualValue\}) => \`Value does not match a required pattern: $\{requiredPattern\}!\`,
  \};
  return _formErrors;
\}

@NgModule({
    ...
    providers: [{
        provide: FORM_CONTROL_ERRORS,
        useFactory: formControlErrorsFactory
    }],
})
export class AppModule {
}`;


@Component({
  selector: 'app-error-messages-configuration',
  template: `
      <p>Set error messages global defaults by providing custom factory for FORM_CONTROL_ERRORS service in a NgModule
          e.g.
          <var>src/app/app.module.ts</var></p>
      <code lang="typescript" [code]="exampleTs"></code>
  `,
})
export class ErrorMessagesConfigurationComponent {
  exampleTs = EXAMPLE_TS;

  constructor(protected fb: FormBuilder) {
  }

}


export function formControlErrorsFactory(): FormControlErrors {
  const _formErrors = {
    min: ({min, actual}) => `Expected is at least ${min} but got ${actual}!`,
    max: ({max, actual}) => `Expected is at most ${max} but got ${actual}!`,
    required: (error) => `This field is required!`,
    requiredTrue: (error) => `This field is required!`,
    email: (error) => `Invalid email!`,
    minlength: ({requiredLength, actualLength}) => `Expected length is at least ${requiredLength} but got ${actualLength}!`,
    maxlength: ({requiredLength, actualLength}) => `Expected length is at most ${requiredLength} but got ${actualLength}!`,
    pattern: ({requiredPattern, actualValue}) => `Value does not match a required pattern: ${requiredPattern}!`,
  };
  return _formErrors;
}


@NgModule({
  declarations: [
    ErrorMessagesConfigurationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlValidationModule,
    CodeModule,
  ],
  exports: [
    ErrorMessagesConfigurationComponent,
  ],
  providers: [{
    provide: FORM_CONTROL_ERRORS,
    useFactory: formControlErrorsFactory
  }],
})
export class ErrorMessagesConfigurationModule {
}
