import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UssGravelyWafLogComponent } from './uss-gravely-waf-log.component';

describe('UssGravelyWafLogComponent', () => {
  let component: UssGravelyWafLogComponent;
  let fixture: ComponentFixture<UssGravelyWafLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UssGravelyWafLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UssGravelyWafLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
