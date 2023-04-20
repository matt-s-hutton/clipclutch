import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ControlOptions } from '../shared/models/control-options.type';
import { validUrl } from '../shared/validators/valid-url';
import { DownloadOptions, DownloadParameters } from '../shared/models/download-parameters.type';
import { DownloadService } from '../services/download/download.service';
import { DownloadDetails, DownloadResponse } from '../shared/models/download-response.type';
import { HttpErrorResponse } from '@angular/common/http';
import { FG_URL_KEY } from '../shared/const/video-form-url-key.const';
import { OptionButtonService } from '../services/option-button/option-button.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config/config.service';
import { Config } from '../shared/models/config.type';

@Component({
  selector: 'cc-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public config: Config;

  public videoForm : FormGroup = new FormGroup({});
  public fgUrlKey = FG_URL_KEY;

  public urlError = '';
  public urlPlaceholder = 'Enter your URL';
  public urlPlaceholderErrorDisplayed = false;
  public optionsButtons: ControlOptions[] = [];
  public showLoader = false;
  public media = 'video';

  public formatOptionIds: string[] = this.optionButtonService.getFormatOptionsIds();
  public videoFormatOptionIds: string[] = this.optionButtonService.getVideoFormatOptionsIds();
  public audioFormatOptionIds: string[] = this.optionButtonService.getAudioFormatOptionsIds();

  public dl: DownloadDetails | null = null;
  public downloadErrorMessage = '';
  public urlHasNotBeenEntered = true;

  private subscriptions: (Subscription | undefined)[] = [];
  private localStorageDlKey = 'dl';
  private localStorageExpirationKey = 'expiration';

  constructor(
    private fb: FormBuilder,
    private downloadService: DownloadService,
    private optionButtonService: OptionButtonService,
    private configService: ConfigService
  ) {
    this.config = this.configService.config;
    this.videoForm = this.fb.group({
      [this.fgUrlKey]: new FormControl('', [Validators.required, validUrl()]),
    });
  }

  ngOnInit(): void {
    this.setDownloadData();
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
      this.subscriptions.push(this.listenToFormatOptionsChanges(option.id, formatOptions));
    }
  }

  /**
   * Listens for value changes to format options buttons
   * @param formControlName
   * @param allFormatButtons
   * @returns Subscription | undefined
   */
  private listenToFormatOptionsChanges(formControlName: string, allFormatButtons: ControlOptions[]): Subscription | undefined {
    return this.videoForm.get(formControlName)?.valueChanges.subscribe( (value: boolean) => {
      if (value) {
        this.media = this.videoFormatOptionIds.includes(formControlName) ? 'video' : 'audio';
        for (const oppositeName of allFormatButtons) {
          if (oppositeName.id !== formControlName) {
            this.videoForm.get(oppositeName.id)?.patchValue(false);
          }
        }
      }
      const allDisabled = allFormatButtons.every( (button) => !this.videoForm.get(button.id)?.value);
      if (allDisabled) {
        this.videoForm.get(formControlName)?.patchValue(true);
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
      this.urlPlaceholder = "URL required!";
      this.urlPlaceholderErrorDisplayed = true;
      return;
    }
    this.showLoader = true;
    const downloadParameters: DownloadParameters = {
      url: this.videoForm.get(this.fgUrlKey)?.value,
      options: this.getOptions()
    };
    this.downloadService.getDownloadLink(downloadParameters).subscribe({
      next: (response: DownloadResponse) => this.submitFormSuccess(response.message),
      error: (e: HttpErrorResponse) => this.submitFormError(e)
    });
  }

  private submitFormSuccess(downloadpath: DownloadDetails): void {
    this.showLoader = false;
    this.dl = downloadpath;
    localStorage.setItem(this.localStorageDlKey, JSON.stringify(downloadpath));
    localStorage.setItem(this.localStorageExpirationKey, Date.now().toString());
  }

  private submitFormError(error: HttpErrorResponse): void {
    this.showLoader = false;
    this.downloadErrorMessage = error.message;
  }

  /**
   * Create a DownloadOptions object which can be sent to the API.
   * @returns DownloadOptions
   */
  private getOptions(): DownloadOptions {
    const options: DownloadOptions = {
      convertFormat: '',
      embedSubs: this.videoForm.get(this.optionButtonService.getEmbedSubsId())?.value ?? false,
      getThumbnail: this.videoForm.get(this.optionButtonService.getThumbnailId())?.value ?? false
    };
    for (const controlName in this.videoForm.controls) {
      const control = this.videoForm.get(controlName);
      if (this.formatOptionIds.includes(controlName) && control?.value) {
        options.convertFormat = controlName;
      }
    }
    return options;
  }

  /**
   * Clear local storage if older than 25 minutes, else set dl value to what is in local storage.
   * @returns void
   */
  private setDownloadData(): void {
    const expiry = Number(localStorage.getItem(this.localStorageExpirationKey));
    if (!isNaN(expiry) && Math.floor((Date.now() - expiry) / 60000) > this.config.minutesToExpiry) {
      localStorage.removeItem(this.localStorageDlKey);
      localStorage.removeItem(this.localStorageExpirationKey);
      return;
    }
    const dlString = localStorage.getItem(this.localStorageDlKey);
    if (dlString !== null) {
      this.dl = JSON.parse(dlString);
    }
  }
}
