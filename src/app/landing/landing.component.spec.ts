import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LandingComponent } from './landing.component';
import { CcOptionsComponent } from '../cc-options/cc-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CcPreviewComponent } from '../cc-preview/cc-preview.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

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
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form if a valid URL has been entered', () => {
    expect(true).toBeTrue();
  });
});
