import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSave, lucideUpload } from '@ng-icons/lucide';
import { BrnDialogClose, BrnDialogRef } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@libs/ui/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import {
  HlmDialogHeader,
  HlmDialogTitle,
  HlmDialogDescription,
  HlmDialogFooter,
} from '@libs/ui/dialog';

import { Files, Categories, ImportFiles } from '../import-files.model';
import { ImportFilesService } from '../import-files.service';
import { ProjectsService } from '../../projects/projects.service';
import { Projects } from '../../projects/projects.model';
import { injectBrnDialogContext } from '@spartan-ng/brain/dialog';

@Component({
  selector: 'app-import-files-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIcon,
    HlmIcon,
    HlmButtonImports,
    HlmInputImports,
    HlmLabelImports,
    BrnSelectImports,
    HlmSelectImports,
    BrnDialogClose,
    HlmDialogHeader,
    HlmDialogTitle,
    HlmDialogDescription,
    HlmDialogFooter,
  ],
  providers: [
    provideIcons({
      lucideSave,
      lucideUpload,
    }),
  ],
  templateUrl: './import-files-detail.component.html',
  styleUrl: './import-files-detail.component.scss',
})
export class ImportFilesDetailComponent {
  private readonly fb = inject(FormBuilder);
  private readonly importFilesService = inject(ImportFilesService);
  private readonly projectsService = inject(ProjectsService);
  private readonly dialogRef = inject(BrnDialogRef, { optional: true });
  private readonly dialogContext = injectBrnDialogContext<{
    item?: Files | null;
    onSave?: () => void;
  }>({
    optional: true,
  });

  // Check if we're in edit mode
  readonly isEditMode = computed(() => !!this.dialogContext?.item);

  // Categories and Projects signals
  readonly categories = signal<Categories[]>([]);
  readonly projects = signal<Projects[]>([]);
  readonly selectedFile = signal<File | null>(null);
  readonly selectedFileName = signal<string>('');

  // Form group with all controls
  readonly form: FormGroup = this.fb.group({
    CategoryId: [null, [Validators.required]],
    ProjectId: ['', [Validators.required]],
    FileDate: ['', [Validators.required]],
  });

  constructor() {
    // Load categories and projects
    this.loadCategories();
    this.loadProjects();

    // Populate form if editing existing item
    const item = this.dialogContext?.item;
    if (item) {
      this.form.patchValue({
        CategoryId: item.category_id || null,
        ProjectId: item.project_id || '',
        FileDate: item.file_date ? this.formatDateForInput(item.file_date) : '',
      });
      this.selectedFileName.set(item.file_name || '');
    }
  }

  private loadCategories(): void {
    this.importFilesService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories || []);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.categories.set([]);
      },
    });
  }

  private loadProjects(): void {
    // Load all projects (using page 1 and large page size to get all)
    this.projectsService.getProjects({
      id: '',
      project_name: '',
      PageNumber: 1,
      PageSize: 1000,
      Sorting: '',
    }).subscribe({
      next: (response) => {
        this.projects.set(response.items || []);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.projects.set([]);
      },
    });
  }

  private formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Computed form validity
  readonly isFormValid = computed(() => this.form.valid && this.selectedFile() !== null);

  // Helper methods to check field validity
  isFieldValid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.valid || !control.touched : true;
  }

  isFieldRequired(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.hasError('required') && control.touched : false;
  }

  getFieldError(fieldName: string): string | null {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !control.touched) return null;

    if (control.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    return null;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      CategoryId: 'Category',
      ProjectId: 'Project',
      FileDate: 'File Date',
    };
    return labels[fieldName] || fieldName;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);
      this.selectedFileName.set(file.name);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onSave(): void {
    if (this.form.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    if (!this.selectedFile() && !this.isEditMode()) {
      // File is required for new imports
      alert('Please select a file to import');
      return;
    }

    const formValue = this.form.value;

    const item: ImportFiles = {
      CategoryId: formValue.CategoryId,
      File: this.selectedFile()?.name || '',
      ProjectId: formValue.ProjectId,
      FileDate: new Date(formValue.FileDate),
    };

    // Use runImportFiles method to import the file
    this.importFilesService.runImportFiles(item).subscribe({
      next: (response) => {
        console.log('Import file saved successfully:', response);
        // Call callback if provided (to reload data in parent)
        this.dialogContext?.onSave?.();
        this.dialogRef?.close();
        this.form.reset();
        this.selectedFile.set(null);
        this.selectedFileName.set('');
      },
      error: (error) => {
        console.error('Error saving import file:', error);
        // TODO: Show error message to user
      },
    });
  }

  onCancel(): void {
    // Dialog will close automatically via brnDialogClose
    this.form.reset();
    this.selectedFile.set(null);
    this.selectedFileName.set('');
  }
}
