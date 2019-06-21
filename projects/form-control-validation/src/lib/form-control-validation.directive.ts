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


@Directive({
  selector: '[formControlName][nzFormControlValidation], [formGroup][nzFormControlValidation]'
})
export class FormControlValidationDirective implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('nzFormControlValidation') componentClass?: Type<IFormControlValidationComponent>;
  private defaultComponentClass: Type<IFormControlValidationComponent> = FormControlValidationComponent;
  private componentRef: ComponentRef<IFormControlValidationComponent>;
  private control: AbstractControlDirective;
  private statusChangeSubscription: Subscription;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef,
              private render: Renderer2,
              @Optional() @Self() private formControl: FormControlName,
              @Host() private formGroup: FormGroupDirective) {
    this.control = formControl ? formControl : formGroup;
  }

  ngOnInit(): void {
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
    this.componentRef.instance.name = this.formControl ? this.formControl.name : null;
    this.componentRef.instance.errors = this.control.errors;
  }

}
