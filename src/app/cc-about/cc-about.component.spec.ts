import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcAboutComponent } from './cc-about.component';

describe('CcAboutComponent', () => {
  let component: CcAboutComponent;
  let fixture: ComponentFixture<CcAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
