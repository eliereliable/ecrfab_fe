import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfLogComponent } from './crf-log.component';

describe('CrfLogComponent', () => {
  let component: CrfLogComponent;
  let fixture: ComponentFixture<CrfLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrfLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrfLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
