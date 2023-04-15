import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cc-contact',
  templateUrl: './cc-contact.component.html',
  styleUrls: ['./cc-contact.component.css']
})
export class CcContactComponent {
  public contactForm: FormGroup = new FormGroup({});

  public emailControlName = 'email';
  public messageControlName = 'message';

  public emailInvalid = false;

  constructor (private readonly fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, [Validators.required])
    });

    this.contactForm.get('email')?.valueChanges.subscribe( () => {
      const errors = this.contactForm.get('email')?.errors;
      this.emailInvalid = errors ? errors['email'] : false;
    });
  }

  public send(): void {
    return;
  }
}
