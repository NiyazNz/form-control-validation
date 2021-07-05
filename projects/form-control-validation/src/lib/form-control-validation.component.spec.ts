import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {FormControlValidationComponent} from './form-control-validation.component';


describe('FormControlValidationComponent', () => {
    let component: FormControlValidationComponent;
    let fixture: ComponentFixture<FormControlValidationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FormControlValidationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormControlValidationComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.name = 'username';
        component.errorMessages = {};
        component.errors = {required: true};
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('This field is required');
    });
});
