import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeByJobComponent } from './time-by-job.component';

describe('TimeByJobComponent', () => {
  let component: TimeByJobComponent;
  let fixture: ComponentFixture<TimeByJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeByJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeByJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
