import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LandingComponent } from './landing.component';
import { CcOptionsComponent } from '../cc-options/cc-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CcPreviewComponent } from '../cc-preview/cc-preview.component';
import { VideoFormStub } from '../shared/test/stubs/video-form-stub';
import { FG_URL_KEY } from '../shared/const/video-form-url-key.const';
import { DownloadService } from '../services/download/download.service';
import { Observable, of, throwError } from 'rxjs';
import { DownloadParameters } from '../shared/models/download-parameters.type';
import { OPTIONS_BUTTONS } from '../shared/const/control-options.const';
import { DownloadResponse } from '../shared/models/download-response.type';
import { HttpErrorResponse } from '@angular/common/http';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  const videoFormStubber: VideoFormStub = new VideoFormStub();
  let getDownloadLinkMock: jasmine.SpyObj<DownloadService>;
  const downloadLinkErrorResponse: HttpErrorResponse = new HttpErrorResponse(
    {
      error: 'Cannot brew coffee',
      status: 418,
      statusText: 'I\'m a teapot'
    }
  );
  const downloadLinkSuccessResponse: DownloadResponse = {
    status: 200,
    message: {
      path: 'path'
    }
  };
  const downloadLinkSuccessResponse$: Observable<DownloadResponse> = of(downloadLinkSuccessResponse);

  beforeEach(async () => {
    getDownloadLinkMock = jasmine.createSpyObj('DownloadService', ['getDownloadLink']);
    getDownloadLinkMock.getDownloadLink.and.returnValue(downloadLinkSuccessResponse$);
    await TestBed.configureTestingModule({
      declarations: [
        LandingComponent,
        CcOptionsComponent,
        CcPreviewComponent
      ],
      providers: [
        {
          provide: DownloadService,
          useValue: getDownloadLinkMock
        }
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    component.videoForm = videoFormStubber.getVideoFormStub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form with the correct parameters if a valid URL has been entered', () => {
    // GIVEN
    // A valid URL is entered
    component.urlHasNotBeenEntered = false;
    component.videoForm.get(FG_URL_KEY)?.patchValue('https://www.youtube.com/watch?v=jNQXAC9IVRw');

    // One of the options has been chosen
    const enabledOption = OPTIONS_BUTTONS[0];
    component.videoForm.get(enabledOption.inputId)?.patchValue(true);
    const downloadParameters: DownloadParameters = {
      url: component.videoForm.get(FG_URL_KEY)?.value,
      options: [
        enabledOption.inputId
      ]
    };

    // WHEN
    component.submitForm();

    // THEN
    expect(getDownloadLinkMock.getDownloadLink).toHaveBeenCalledWith(downloadParameters);
    expect(component.downloadSrc).toEqual(downloadLinkSuccessResponse.message.path);
  });

  it('should not submit the form if an invalid URL has been entered', () => {
    // GIVEN
    component.urlHasNotBeenEntered = false; // Set this to false so when the form is patched we test that it's set back to true
    component.videoForm.get(FG_URL_KEY)?.patchValue('INVALID_URL');

    // WHEN
    component.submitForm();

    // THEN
    expect(getDownloadLinkMock.getDownloadLink).not.toHaveBeenCalled();
    expect(component.downloadSrc).toEqual('');
  });

  it('should update downloadErrorMessage if the API returns an error', () => {
    // GIVEN
    getDownloadLinkMock.getDownloadLink.and.returnValue(throwError(() => downloadLinkErrorResponse));
    component.urlHasNotBeenEntered = false;
    component.videoForm.get(FG_URL_KEY)?.patchValue('https://www.youtube.com/watch?v=jNQXAC9IVRw');

    // WHEN
    component.submitForm();

    // THEN
    expect(component.downloadErrorMessage).toEqual(downloadLinkErrorResponse.message);
  });
});
