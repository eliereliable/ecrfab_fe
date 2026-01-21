import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RccApplicabilityLogDetailComponent } from './rcc-applicability-log-detail.component';

describe('RccApplicabilityLogDetailComponent', () => {
  let component: RccApplicabilityLogDetailComponent;
  let fixture: ComponentFixture<RccApplicabilityLogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RccApplicabilityLogDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RccApplicabilityLogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
