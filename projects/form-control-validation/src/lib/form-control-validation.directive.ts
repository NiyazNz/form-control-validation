import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Host,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    Self,
    Type,
    ViewContainerRef
} from '@angular/core';
import {merge, Subscription} from 'rxjs';
import {AbstractControlDirective, FormControlName, FormGroupDirective} from '@angular/forms';
import {FormControlValidationComponent, IFormControlValidationComponent} from './form-control-validation.component';
import {mapTo} from 'rxjs/operators';
import {FormControlErrors} from './form-control-errors.service';


// TODO propagate validation and error messages to form controls if directive applied to form

@Directive({
    selector: '[formControlName][nzFormControlValidation], [formGroup][nzFormControlValidation]'
})
export class FormControlValidationDirective implements OnInit, OnDestroy {
    /**
     * Component, rendering error messages.
     * By default FormControlValidationComponent is used.
     */  // tslint:disable-next-line:no-input-rename
    @Input('nzFormControlValidation') componentClass?: Type<IFormControlValidationComponent>;
    /**
     * Error message for Validators.min.
     * If not specified, message from global configuration is used.
     */
    @Input() minError?: string;
    /**
     * Error message for Validators.max.
     * If not specified, message from global configuration is used.
     */
    @Input() maxError?: string;
    /**
     * Error message for Validators.required.
     * If not specified, message from global configuration is used.
     */
    @Input() requiredError?: string;
    /**
     * Error message for Validators.requiredTrue.
     * If not specified, message from global configuration is used.
     */
    @Input() requiredTrueError?: string;
    /**
     * Error message for Validators.email.
     * If not specified, message from global configuration is used.
     */
    @Input() emailError?: string;
    /**
     * Error message for Validators.minlength.
     * If not specified, message from global configuration is used.
     */
    @Input() minlengthError?: string;
    /**
     * Error message for Validators.maxlength.
     * If not specified, message from global configuration is used.
     */
    @Input() maxlengthError?: string;
    /**
     * Error message for Validators.pattern.
     * If not specified, message from global configuration is used.
     */
    @Input() patternError?: string;
    /**
     * Error messages for other validators.
     * Has lower priority than more specific error messages and can be overwritten by them
     */
    @Input() validatorErrors?: FormControlErrors = {};
    private defaultComponentClass: Type<IFormControlValidationComponent> = FormControlValidationComponent;
    private componentRef: ComponentRef<IFormControlValidationComponent>;
    private control: AbstractControlDirective;
    private statusChangeSubscription: Subscription;
    private errorMessages: FormControlErrors;

    constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef,
                private render: Renderer2,
                @Optional() @Self() private formControl: FormControlName,
                @Host() private formGroup: FormGroupDirective) {
        this.control = formControl ? formControl : formGroup;
    }

    ngOnInit(): void {
        this.errorMessages = this.getErrorMessages();
        this.statusChangeSubscription = merge(
            this.control.statusChanges,
            this.formGroup.ngSubmit.pipe(mapTo('FORM_SUBMIT'))
        ).subscribe(status => {
            this.destroy();
            if (status !== 'VALID' && this.control.errors) {
                this.create();
            }
        });
    }

    ngOnDestroy() {
        this.statusChangeSubscription.unsubscribe();
        this.destroy();
    }

    private destroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

    private create() {
        const factory = this.resolver.resolveComponentFactory(this.componentClass || this.defaultComponentClass);
        const injector = Injector.create({providers: []});
        this.componentRef = this.container.createComponent(factory, 0, injector);
        if (!this.formControl) {  // insert form errors before controls
            this.render.insertBefore(
                this.container.element.nativeElement,
                this.componentRef.location.nativeElement,
                this.container.element.nativeElement.firstChild
            );
        }
        this.componentRef.instance.name = this.formControl ? this.formControl.name.toString() : null;
        this.componentRef.instance.errorMessages = this.errorMessages;
        this.componentRef.instance.errors = this.control.errors;
    }

    /**
     * Collect user defined error messages
     */
    private getErrorMessages(): FormControlErrors {
        return {
            ...this.validatorErrors,
            ...(this.minError && {min: this.minError}),
            ...(this.maxError && {max: this.maxError}),
            ...(this.requiredError && {required: this.requiredError}),
            ...(this.requiredTrueError && {requiredTrue: this.requiredTrueError}),
            ...(this.emailError && {email: this.emailError}),
            ...(this.minlengthError && {minlength: this.minlengthError}),
            ...(this.maxlengthError && {maxlength: this.maxlengthError}),
            ...(this.patternError && {pattern: this.patternError}),
        };
    }

}
