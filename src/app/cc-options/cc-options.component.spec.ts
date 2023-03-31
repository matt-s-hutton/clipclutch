import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcOptionsComponent } from './cc-options.component';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from '../landing/landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CcOptionsComponent', () => {
  let component: CcOptionsComponent;
  let fixture: ComponentFixture<CcOptionsComponent>;
  let formGroup: FormGroup;
  let formGroupDirective: FormGroupDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcOptionsComponent ],
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
    const parentFixture = TestBed.createComponent(LandingComponent);
    const parentComponent = parentFixture.componentInstance;
    formGroup = parentComponent.videoForm;
    formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = formGroup;

    fixture = TestBed.createComponent(CcOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
