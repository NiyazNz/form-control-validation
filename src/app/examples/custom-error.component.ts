import {Component, Input, NgModule} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {FormControlValidationModule, IFormControlValidationComponent} from '@enzedd/form-control-validation';
import {FormControlErrorsService} from '../../../projects/form-control-validation/src/lib/form-control-errors.service';
import {BrowserModule} from '@angular/platform-browser';
import {CodeModule} from '../code/code.module';


const EXAMPLE_HTML = `
<input type="text" class="form-control" id="first-name" placeholder="First name"
       formControlName="firstName"
       [nzFormControlValidation]="component"
>`;
const EXAMPLE_TS = `
import {IFormControlValidationComponent} from '@enzedd/form-control-validation';

export class CustomErrorComponent {
    component: IFormControlValidationComponent = CustomFormControlValidationComponent;
    ...
}`;
const EXAMPLE_MODULE_TS = `
@NgModule({
    ...
    entryComponents: [CustomFormControlValidationComponent]
})
export class AppModule {
}`;


@Component({
    selector: 'app-custom-form-control-validation-component',
    template: `
        <div class="alert alert-danger">{{errorText}}</div>`,
})
export class CustomFormControlValidationComponent implements IFormControlValidationComponent {
    private _errors: ValidationErrors;
    errorText: string;
    @Input() errorMessages = {};
    @Input() name?: string;

    @Input() set errors(value: ValidationErrors) {
        this._errors = value;

        const [key, args] = Object.entries(this._errors)[0];
        this.errorText = this.errorMessages[key] ? this.errorMessages[key] : this.formControlErrorsService.get(key, args);
    }

    get errors(): ValidationErrors {
        return this._errors;
    }

    constructor(protected formControlErrorsService: FormControlErrorsService) {
    }
}


@Component({
    selector: 'app-custom-error',
    template: `
        <p>Try to edit or click submit button to see validation errors in custom component</p>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form-group">
                <label for="first-name">First Name</label>
                <input type="text" class="form-control" id="first-name" placeholder="First name"
                       formControlName="firstName"
                       [nzFormControlValidation]="component"
                >
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
        <hr>

        <p>Specify value for <strong>nzFormControlValidation</strong> directive to provide custom component which
            renders
            formControl validation errors. Custom component should implement
            <strong>IFormControlValidationComponent</strong> interface. Sample implementation can be found at
            <a href="https://gitlab.com/Enzedd/form-control-validation/blob/master/projects/form-control-validation/src/lib/form-control-validation.component.ts">form-control-validation.component.ts</a>
        </p>
        <code lang="html" [code]="exampleHtml"></code>
        <code lang="typescript" [code]="exampleTs"></code>
        <p>Add your custom component to <strong>entryComponents</strong> of NgModule e.g.
            <var>src/app/app.module.ts</var>
        </p>
        <code lang="typescript" [code]="exampleModuleTs"></code>
    `,
})
export class CustomErrorComponent {
    exampleHtml = EXAMPLE_HTML;
    exampleTs = EXAMPLE_TS;
    exampleModuleTs = EXAMPLE_MODULE_TS;

    component = CustomFormControlValidationComponent;

    form = this.fb.group({
        firstName: ['', [
            Validators.required,
            Validators.minLength(3),
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


@NgModule({
    declarations: [
        CustomErrorComponent,
        CustomFormControlValidationComponent,
    ],
    entryComponents: [
        CustomFormControlValidationComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlValidationModule,
        CodeModule,
    ],
    exports: [
        CustomErrorComponent,
    ],
})
export class CustomErrorModule {
}
