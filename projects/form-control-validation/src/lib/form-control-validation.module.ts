import {NgModule} from '@angular/core';
import {FormControlValidationComponent} from './form-control-validation.component';
import {FormControlValidationDirective} from './form-control-validation.directive';


@NgModule({
    declarations: [
        FormControlValidationComponent,
        FormControlValidationDirective,
    ],
    imports: [],
    exports: [
        FormControlValidationComponent,
        FormControlValidationDirective,
    ]
})
export class FormControlValidationModule {
}
