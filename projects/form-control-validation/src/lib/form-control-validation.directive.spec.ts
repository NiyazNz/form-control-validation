import {FormControlValidationDirective} from './form-control-validation.directive';
import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControlValidationModule} from './form-control-validation.module';


const selector = 'NZ-FORM-CONTROL-VALIDATION';


@Component({
    template: `
        <form id="form" [formGroup]="form" nzFormControlValidation>
            <input type="text" id="input1" formControlName="input1"
                   nzFormControlValidation
            >
            <input type="text" id="input2" formControlName="input2"
                   nzFormControlValidation
                   requiredError="message from requiredError"
            >
            <input type="text" id="input3" formControlName="input3"
                   nzFormControlValidation
                   requiredError="message from requiredError"
                   [validatorErrors]="{required: 'message from validatorErrors'}"
            >
            <input type="text" id="input4" formControlName="input4"
                   nzFormControlValidation
                   [validatorErrors]="{required: 'message from validatorErrors'}"
            >
        </form>
    `
})
class TestComponent {
    form = this.fb.group({
        input1: ['', [Validators.required]],
        input2: ['', [Validators.required]],
        input3: ['', [Validators.required]],
        input4: ['', [Validators.required]],
    }, {
        validators: () => {
            return {
                formError: true,
            };
        }
    });

    constructor(protected fb: FormBuilder) {
    }
}


describe('FormControlValidationDirective', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [ReactiveFormsModule, FormControlValidationModule]
        }).createComponent(TestComponent);

        fixture.detectChanges();
    });

    it('should not create on valid value', () => {
        const input: HTMLInputElement = fixture.nativeElement.querySelector('#input1');
        input.value = 'valid';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const usernameError: Element = input.nextElementSibling;
        expect(usernameError.tagName).not.toBe(selector);
    });

    it('should render form error', () => {
        const form: HTMLFormElement = fixture.nativeElement.querySelector('#form');
        form.dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        const formError: Element = form.firstElementChild;
        expect(formError.tagName).toBe(selector);
        expect(formError.textContent).toBe('formError');
    });

    function expectMessage(inputId, message) {
        const input: HTMLInputElement = fixture.nativeElement.querySelector(inputId);
        input.value = '';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const usernameError: Element = input.nextElementSibling;
        expect(usernameError).toBeTruthy();
        expect(usernameError.tagName).toBe(selector);
        expect(usernameError.textContent).toBe(message);
    }

    it('should render message from service', () => {
        expectMessage('#input1', 'This field is required');
    });

    it('should render message from input value', () => {
        expectMessage('#input2', 'message from requiredError');
    });

    it('should render message from input value (priority over validatorErrors)', () => {
        expectMessage('#input3', 'message from requiredError');
    });

    it('should render message from validatorErrors', () => {
        expectMessage('#input4', 'message from validatorErrors');
    });
});
