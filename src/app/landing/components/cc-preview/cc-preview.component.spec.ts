import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcPreviewComponent } from './cc-preview.component';

describe('CcPreviewComponent', () => {
  let component: CcPreviewComponent;
  let fixture: ComponentFixture<CcPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
