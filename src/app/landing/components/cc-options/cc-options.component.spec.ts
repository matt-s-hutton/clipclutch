import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcOptionsComponent } from './cc-options.component';

describe('CcOptionsComponent', () => {
  let component: CcOptionsComponent;
  let fixture: ComponentFixture<CcOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
