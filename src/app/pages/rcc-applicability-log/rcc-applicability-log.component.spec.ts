import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RccApplicabilityLogComponent } from './rcc-applicability-log.component';

describe('RccApplicabilityLogComponent', () => {
  let component: RccApplicabilityLogComponent;
  let fixture: ComponentFixture<RccApplicabilityLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RccApplicabilityLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RccApplicabilityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
