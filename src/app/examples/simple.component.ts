import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


const EXAMPLE_HTML = `
<input type="text" class="form-control" id="username" placeholder="Username"
       formControlName="username"
       nzFormControlValidation
>`;


@Component({
  selector: 'app-simple',
  template: `
      <p>Try to edit or click submit button to see validation errors</p>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" id="username" placeholder="Username"
                     formControlName="username"
                     nzFormControlValidation
              >
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
      </form>
      <hr>
      <p>Add <strong>nzFormControlValidation</strong> directive to form control (input)</p>
      <div lang="html" [code]="exampleHtml"></div>
  `,
})
export class SimpleComponent {
  exampleHtml = EXAMPLE_HTML;

  form = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.pattern(/[a-z]\w*/),
      Validators.minLength(3),
      Validators.maxLength(10)
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
