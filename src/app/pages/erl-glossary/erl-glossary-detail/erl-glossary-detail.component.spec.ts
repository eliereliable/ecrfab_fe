import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErlGlossaryDetailComponent } from './erl-glossary-detail.component';

describe('ErlGlossaryDetailComponent', () => {
  let component: ErlGlossaryDetailComponent;
  let fixture: ComponentFixture<ErlGlossaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErlGlossaryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErlGlossaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
