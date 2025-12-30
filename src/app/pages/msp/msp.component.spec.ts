import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MspComponent } from './msp.component';

describe('MspComponent', () => {
  let component: MspComponent;
  let fixture: ComponentFixture<MspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MspComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
