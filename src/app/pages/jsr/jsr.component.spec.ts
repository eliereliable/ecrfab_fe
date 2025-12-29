import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsrComponent } from './jsr.component';

describe('JsrComponent', () => {
  let component: JsrComponent;
  let fixture: ComponentFixture<JsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
