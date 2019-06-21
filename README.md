[![npm version](https://img.shields.io/npm/v/@enzedd/form-control-validation.svg)](https://npmjs.com/package/@enzedd/form-control-validation "View on npm")
# FormControlValidation
A simple directive to display angular form validation errors.
```html
<input type="text" formControlName="lastName" nzFormControlValidation>
```
![form-control-validation](https://gitlab.com/Enzedd/form-control-validation/uploads/021f8e829c871927cb5de01c34b4876b/form-control-validation.png)
* No messy HTML markup is required for field errors; instead, one directive is enough
* Humanized messages for built-in angular validators
* Globally customizable error messages for builtin and user validators
* Per control customizable error messages
* Custom component can be provided to render validation errors

## Examples/Demo
* [Demo](https://enzedd.gitlab.io/form-control-validation/)
* A simple example can be found under `src/app` directory of this repository.

## Getting started

### Step 1: Install `form-control-validation`:
npm
```shell
npm install --save @enzedd/form-control-validation
```
yarn
```shell
yarn add @enzedd/form-control-validation
```

### Step 2: Import `FormControlValidationModule` and angular `ReactiveFormsModule` modules:
```typescript
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlValidationModule} from '@enzedd/form-control-validation';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
    ReactiveFormsModule,
    FormControlValidationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Step 3: Add `nzFormControlValidation` directive to form control (input)
```html
 <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="first-name">First Name</label>
        <input type="text" class="form-control" nzFormControlValidation
               id="first-name" formControlName="firstName" placeholder="First name">
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
</form>
```
[Add validators](https://angular.io/guide/form-validation#reactive-form-validation) to your form controls 
### Step 4 (Optional): Configuration
You can also set error messages by providing custom factory for `FORM_CONTROL_ERRORS` service.
```typescript
import {FORM_CONTROL_ERRORS, FormControlErrors} from '@enzedd/form-control-validation';

export function formControlErrorsFactory(): FormControlErrors {
  const _formErrors = {
    ...
    minlength: ({requiredLength, actualLength}) => `Expected length is at least ${requiredLength}`,
  };
  return _formErrors;
}

@NgModule({
  ...
  providers: [
    {provide: FORM_CONTROL_ERRORS, useFactory: formControlErrorsFactory}
  ],
}
```

## API
### Inputs
| Input  | Type | Default | Required | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| [nzFormControlValidation] | IFormControlValidationComponent |  FormControlValidationComponent | yes (value not required) | Custom component can be provided to render formControl humanized validation error 
| [minError] | string | null | no | Error message for Validators.min<sup>1</sup> |
| [maxError] | string | null | no | Error message for Validators.max<sup>1</sup> |
| [requiredError] | string | null | no | Error message for Validators.required<sup>1</sup> |
| [requiredTrueError] | string | null | no | Error message for Validators.requiredTrue<sup>1</sup> |
| [emailError] | string | null | no | Error message for Validators.email<sup>1</sup> |
| [minlengthError] | string | null | no | Error message for Validators.minlength<sup>1</sup> |
| [maxlengthError] | string | null | no | Error message for Validators.maxlength<sup>1</sup> |
| [patternError] | string | null | no | Error message for Validators.pattern<sup>1</sup> |
| [validatorErrors] | Object | null | no | Error messages for other validators. Has lower priority than more specific error messages and can be overwritten by them |
<sup>1</sup> If error message not specified, message from global configuration will be used. See [configuration](#step-4-optional-configuration) section.

## Development
Library location is under `projects/form-control-validation` directory of this repository.

Demo application is under `src` directory of this repository.

### Development server
Run `npm run lib:watch` to incrementally build library as a background process in your dev environment

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build library
Run `npm run lib:build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Publishing
After building your library, go to the dist folder `cd dist/form-control-validation` and run `npm publish`.

### Running unit tests
Run `npm run lib:test` to execute the library unit tests via [Karma](https://karma-runner.github.io).
