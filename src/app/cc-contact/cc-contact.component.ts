import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../services/email/email.service';
import { EmailParameters } from '../shared/models/email-parameters.type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cc-contact',
  templateUrl: './cc-contact.component.html',
  styleUrls: ['./cc-contact.component.css']
})
export class CcContactComponent {
  public contactForm: FormGroup = new FormGroup({});

  public emailControlName = 'email';
  public messageControlName = 'message';

  public emailNotEntered = true;
  public emailInvalid = false;

  public sendResult = '';
  public emailSentResult = 'Email sent!';

  constructor (private readonly fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, [Validators.required])
    });

    this.contactForm.get(this.emailControlName)?.valueChanges.subscribe( (email: string) => {
      if (email) {
        this.emailNotEntered = false;
        const errors = this.contactForm.get(this.emailControlName)?.errors;
        this.emailInvalid = errors ? errors[this.emailControlName] : false;
      } else {
        this.emailNotEntered = true;
        this.emailInvalid = false;
      }
    });
  }

  public send(): void {
    if (this.emailNotEntered || this.emailInvalid) {
      return;
    }
    this.sendResult = '';
    const emailParameters: EmailParameters = {
      email: this.contactForm.get(this.emailControlName)?.value,
      message: this.contactForm.get(this.messageControlName)?.value
    };
    this.emailService.sendEmail(emailParameters).subscribe({
      next: () => this.sendEmailSuccess(),
      error: (error: HttpErrorResponse) => this.sendEmailError(error)
    });
  }

  private sendEmailSuccess(): void {
    this.sendResult = this.emailSentResult;
  }

  private sendEmailError(error: HttpErrorResponse): void {
    this.sendResult = `Could not send email: ${error.message}`;
  }
}
