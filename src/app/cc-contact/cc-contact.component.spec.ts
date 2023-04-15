import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcContactComponent } from './cc-contact.component';

describe('CcContactComponent', () => {
  let component: CcContactComponent;
  let fixture: ComponentFixture<CcContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
