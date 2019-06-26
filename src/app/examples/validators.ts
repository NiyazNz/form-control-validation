import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';


export class NzValidators {
    static fieldsCannotMatchValidator = (fieldName1: string, fieldName2: string): ValidatorFn => {
        if (!fieldName1 || !fieldName2) {
            return Validators.nullValidator;
        }
        return (control: FormGroup): ValidationErrors | null => {
            const field1 = control.get(fieldName1);
            const field2 = control.get(fieldName2);
            return field1 && field2 && field1.value && field2.value && field1.value === field2.value ? {
                fieldsCannotMatch: {field1: fieldName1, field2: fieldName2}
            } : null;
        };
    }

    static notEquals = (values: string[]): ValidatorFn => {
        if (!values) {
            return Validators.nullValidator;
        }
        return (control: FormControl): ValidationErrors | null => {
            return control.value && values.includes(control.value) ? {notEquals: {value: control.value}} : null;
        };
    }

}
