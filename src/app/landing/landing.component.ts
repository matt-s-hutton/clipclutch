import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ControlOptions } from '../shared/models/control-options.type';
import { validUrl } from '../shared/validators/valid-url';
import { DownloadOptions, DownloadParameters } from '../shared/models/download-parameters.type';
import { DownloadService } from '../services/download/download.service';
import { DownloadResponse } from '../shared/models/download-response.type';
import { HttpErrorResponse } from '@angular/common/http';
import { FG_URL_KEY } from '../shared/const/video-form-url-key.const';
import { OptionButtonService } from '../services/option-button/option-button.service';
import { VIDEO_FORMAT } from '../shared/const/supported_video_formats.const';
import { AUDIO_FORMAT } from '../shared/const/supported_audio_formats.const';
import { Subscription } from 'rxjs';

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

  private subscriptions: (Subscription | undefined)[] = [];

  constructor(
    private fb: FormBuilder,
    private downloadService: DownloadService,
    private optionButtonService: OptionButtonService
  ) {
    this.videoForm = this.fb.group({
      [this.fgUrlKey]: new FormControl('', [Validators.required, validUrl()]),
    });
  }

  ngOnInit(): void {
    this.optionsButtons = this.optionButtonService.getOptionsButtons();
    for (const option of this.optionsButtons) {
      this.videoForm.addControl(option.id, new FormControl(option.default));
    }
    this.setSubscriptions();
  }

  private setSubscriptions(): void {
    this.subscriptions.push(this.listenForErrors());
    const formatOptions: ControlOptions[] = this.optionButtonService.getFormatOptionsButtons();
    for (const option of formatOptions) {
      this.subscriptions.push(this.setOppositeFormatDisabled(option.id, formatOptions));
    }
  }

  /**
   * Subscribes to a FormControl's value changes. If that FormControl is updated with a true value
   * then set the opposite FormControl to disabled. For use with mutually exclusive option buttons e.g.
   * can't convert a video to both WebM and MP3.
   * @param formControlName
   * @param allFormatButtons
   * @returns Subscription | undefined
   */
  private setOppositeFormatDisabled(formControlName: string, allFormatButtons: ControlOptions[]): Subscription | undefined {
    return this.videoForm.get(formControlName)?.valueChanges.subscribe( (value: boolean) => {
      if (value) {
        for (const oppositeName of allFormatButtons) {
          if (oppositeName.id !== formControlName) {
            this.videoForm.get(oppositeName.id)?.patchValue(false);
          }
        }
      }
    });
  }

  /**
   * Listen for all value changes to the video form in order to display errors if necessary.
   * @returns Subscription | undefined
   */
  private listenForErrors(): Subscription | undefined {
    return this.videoForm.valueChanges.subscribe( () => {
      const errors: ValidationErrors | null | undefined = this.videoForm.get(this.fgUrlKey)?.errors;
        if (errors) {
          this.urlError = errors['urlErrorMessage'];
          this.urlHasNotBeenEntered = !!errors['required'] || !!errors['urlError'];
        } else {
          this.urlError = '';
          this.urlHasNotBeenEntered = false;
        }
    });
  }

  /**
   * Submit the form to the API
   * @returns void
   */
  public submitForm(): void {
    if (this.urlHasNotBeenEntered) {
      this.urlPlaceholder = "You need to enter a link in this field!";
      this.urlPlaceholderErrorDisplayed = true;
      return;
    }
    const downloadParameters: DownloadParameters = {
      url: this.videoForm.get(this.fgUrlKey)?.value,
      options: this.getOptions()
    };
    this.downloadService.getDownloadLink(downloadParameters).subscribe({
      next: (response: DownloadResponse) => this.submitFormSuccess(response.message.path),
      error: (e: HttpErrorResponse) => this.submitFormError(e)
    });
  }

  private submitFormSuccess(downloadpath: string): void {
    this.downloadSrc = downloadpath;
  }

  private submitFormError(error: HttpErrorResponse): void {
    this.downloadErrorMessage = error.message;
  }

  /**
   * Create a DownloadOptions object which can be sent to the API.
   * @returns DownloadOptions
   */
  private getOptions(): DownloadOptions {
    const options: DownloadOptions = {
      convertFormat: '',
      embedSubs: this.videoForm.get(this.optionButtonService.getEmbedSubsId())?.value,
      getThumbnail: this.videoForm.get(this.optionButtonService.getThumbnailId())?.value
    };
    const formatIds = this.optionButtonService.getFormatOptionsIds();
    for (const controlName in this.videoForm.controls) {
      const control = this.videoForm.get(controlName);
      if (formatIds.includes(controlName) && control?.value) {
        options.convertFormat = controlName;
      }
    }
    return options;
  }

}
