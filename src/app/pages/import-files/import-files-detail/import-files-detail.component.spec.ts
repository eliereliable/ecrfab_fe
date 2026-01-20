import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFilesDetailComponent } from './import-files-detail.component';

describe('ImportFilesDetailComponent', () => {
  let component: ImportFilesDetailComponent;
  let fixture: ComponentFixture<ImportFilesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportFilesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportFilesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
