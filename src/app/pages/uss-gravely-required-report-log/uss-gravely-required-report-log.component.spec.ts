import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UssGravelyRequiredReportLogComponent } from './uss-gravely-required-report-log.component';

describe('UssGravelyRequiredReportLogComponent', () => {
  let component: UssGravelyRequiredReportLogComponent;
  let fixture: ComponentFixture<UssGravelyRequiredReportLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UssGravelyRequiredReportLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UssGravelyRequiredReportLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
