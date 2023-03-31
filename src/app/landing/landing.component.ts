import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { OPTIONS_BUTTONS } from '../shared/const/control-options.const';
import { ControlOptions } from '../shared/models/control-options.type';
import { validUrl } from '../shared/validators/valid-url';
import { DownloadParameters } from '../shared/models/download-parameters.type';
import { DownloadService } from '../services/download/download.service';
import { DownloadResponse } from '../shared/models/download-response.type';
import { HttpErrorResponse } from '@angular/common/http';
import { FG_URL_KEY } from '../shared/const/video-form-url-key.const';

@Component({
  selector: 'cc-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public videoForm : FormGroup = new FormGroup({});
  public fgUrlKey = FG_URL_KEY;

  public urlError = '';
  public urlPlaceholder = 'Enter the link to a video here';
  public urlPlaceholderErrorDisplayed = false;
  public optionsButtons: ControlOptions[] = [];

  public downloadSrc = '';
  public downloadErrorMessage = '';
  public urlHasNotBeenEntered = true;

  constructor(private fb: FormBuilder, private downloadService: DownloadService) {
    this.videoForm = this.fb.group({
      [this.fgUrlKey]: new FormControl('', [Validators.required, validUrl()]),
    });
  }

  ngOnInit(): void {
    this.optionsButtons = OPTIONS_BUTTONS.filter( button => button.present);
    for (const option of this.optionsButtons) {
      this.videoForm.addControl(option.inputId, new FormControl(false));
    }
    this.videoForm.valueChanges.subscribe( () => { 
      const errors: ValidationErrors | null | undefined = this.videoForm.get(this.fgUrlKey)?.errors;
        if (errors) {
          this.urlError = errors['urlErrorMessage'];
          this.urlHasNotBeenEntered = !!errors['required'];
        } else {
          this.urlError = '';
        }
    });
  }

  public submitForm(): void {
    if (this.urlHasNotBeenEntered) {
      this.urlPlaceholder = "This field is required!";
      this.urlPlaceholderErrorDisplayed = true;
      return;
    }
    const downloadParameters: DownloadParameters = {
      url: this.videoForm.get(this.fgUrlKey)?.value,
      options: this.getOptions()
    };
    this.downloadService.getDownloadLink(downloadParameters).subscribe({
      next: (response: DownloadResponse) => this.submitFormSuccess(response.path),
      error: (e: HttpErrorResponse) => this.submitFormError(e)
    });
  }

  private submitFormSuccess(downloadpath: string): void {
    this.downloadSrc = downloadpath;
  }

  private submitFormError(error: HttpErrorResponse): void {
    this.downloadErrorMessage = error.message;
  }

  private getOptions(): string[] {
    const options: string[] = [];
    for (const controlName in this.videoForm.controls) {
      const control = this.videoForm.get(controlName);
      const isOption = this.optionsButtons.some( (option) => option.inputId === controlName);
      if (isOption && control?.value) {
        options.push(controlName);
      }
    }
    return options;
  }
  
}
