import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcContactComponent } from './cc-contact.component';
import { EmailService } from '../services/email/email.service';
import { EmailResponse } from '../shared/models/email-response.type';
import { Observable, of, throwError } from 'rxjs';
import { INVALID_EMAILS, VALID_EMAILS } from '../shared/test/const/email-addresses.const';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailParameters } from '../shared/models/email-parameters.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_RESPONSE } from '../shared/test/const/error-response.const';

describe('CcContactComponent', () => {
  let component: CcContactComponent;
  let fixture: ComponentFixture<CcContactComponent>;
  let sendEmailMock: jasmine.SpyObj<EmailService>;
  const emailSuccessResponse: EmailResponse = {
    status: "success",
    detail: "Email sending has been scheduled"
  };
  const emailSuccessResponse$: Observable<EmailResponse> = of(emailSuccessResponse);
  const emailErrorResponse: HttpErrorResponse = ERROR_RESPONSE;

  beforeEach(async () => {
    sendEmailMock = jasmine.createSpyObj('EmailService', ['sendEmail']);
    sendEmailMock.sendEmail.and.returnValue(emailSuccessResponse$);
    await TestBed.configureTestingModule({
      declarations: [ CcContactComponent ],
      providers: [
        {
          provide: EmailService,
          useValue: sendEmailMock
        }
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcContactComponent);
    component = fixture.componentInstance;
    component.contactForm.get(component.emailControlName)?.patchValue('');
    component.contactForm.get(component.messageControlName)?.patchValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const sendEmail = (email: string, message = ''): EmailParameters => {
    // GIVEN
    component.contactForm.get(component.emailControlName)?.patchValue(email);
    component.contactForm.get(component.messageControlName)?.patchValue(message);
    const params: EmailParameters = {
      email: email,
      message: ''
    };

    // WHEN
    component.send();

    return params;
  };

  it('should set result if sending an email is successful', () => {
    sendEmail('email@email.com');

    // THEN
    expect(component.sendResult).toEqual(component.emailSentResult);
  });

  it('should set result if sending an email is unsuccessful', () => {
    sendEmailMock.sendEmail.and.returnValue(throwError(() => emailErrorResponse));
    sendEmail('email@email.com');

    // THEN
    expect(component.sendResult).toEqual(`Could not send email: ${emailErrorResponse.message}`);
  });

  describe('Email validation (valid)', () => {
    for (const email of VALID_EMAILS) {
      it(`should send email when using a VALID email address: ${email}`, () => {
        const params = sendEmail(email);

        // THEN
        expect(sendEmailMock.sendEmail).toHaveBeenCalledWith(params);
      });
    }
  });

  describe('Email validation (invalid)', () => {
    for (const email of INVALID_EMAILS) {
      it(`should NOT send email when using an INVALID email address: ${email}`, () => {
        sendEmail(email);

        // THEN
        expect(sendEmailMock.sendEmail).not.toHaveBeenCalled();
      });
    }
  });
});
