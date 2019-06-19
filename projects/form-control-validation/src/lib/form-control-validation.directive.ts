import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Injector, Input,
  OnDestroy,
  OnInit,
  Self,
  Type,
  ViewContainerRef
} from '@angular/core';
import {merge, Subscription} from 'rxjs';
import {FormControlName} from '@angular/forms';
import {FormControlValidationComponent, IFormControlValidationComponent} from './form-control-validation.component';
import {mapTo} from 'rxjs/operators';


@Directive({
  selector: '[nzFormControlValidation]'
})
export class FormControlValidationDirective implements OnInit, OnDestroy {
  @Input('nzFormControlValidation') componentClass?: Type<IFormControlValidationComponent>;
  private defaultComponentClass: Type<IFormControlValidationComponent> = FormControlValidationComponent;
  private componentRef: ComponentRef<IFormControlValidationComponent>;
  private statusChangeSubscription: Subscription;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef,
              @Self() private control: FormControlName) {
  }

  ngOnInit(): void {
    this.statusChangeSubscription = merge(
      this.control.statusChanges,
      this.control.formDirective.ngSubmit.pipe(mapTo('FORM_SUBMIT'))
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
    this.componentRef.instance.name = this.control.name;
    this.componentRef.instance.errors = this.control.errors;
  }

}
