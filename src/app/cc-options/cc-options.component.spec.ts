import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcOptionsComponent } from './cc-options.component';
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from '../landing/landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CcPreviewComponent } from '../cc-preview/cc-preview.component';
import { VideoFormStub } from '../shared/test/stubs/video-form-stub';

describe('CcOptionsComponent', () => {
  let component: CcOptionsComponent;
  let fixture: ComponentFixture<CcOptionsComponent>;
  const videoFormStubber: VideoFormStub = new VideoFormStub();
  const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
  formGroupDirective.form = videoFormStubber.getVideoFormStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LandingComponent,
        CcOptionsComponent,
        CcPreviewComponent
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: ControlContainer,
          useValue: formGroupDirective
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
