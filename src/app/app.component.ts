import {Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
  }, /*{updateOn: 'blur'}*/);

  constructor(protected fb: FormBuilder) {
  }

  onSubmit() {
    if (this.form.valid) {
      alert('Form submitted');
    }
  }
}
