import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  HlmDialogDescription,
  HlmDialogFooter,
  HlmDialogHeader,
  HlmDialogTitle,
} from '@libs/ui/dialog';
import { HlmIcon } from '@libs/ui/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSave } from '@ng-icons/lucide';
import { BrnDialogClose, BrnDialogRef } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';

import { injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { Projects } from '../projects.model';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIcon,
    HlmIcon,
    HlmButtonImports,
    HlmInputImports,
    HlmLabelImports,
    BrnDialogClose,
    HlmDialogHeader,
    HlmDialogTitle,
    HlmDialogDescription,
    HlmDialogFooter,
  ],
  providers: [
    provideIcons({
      lucideSave,
    }),
  ],
  templateUrl: './projects-detail.component.html',
  styleUrl: './projects-detail.component.scss',
})
export class ProjectsDetailComponent {
  private readonly fb = inject(FormBuilder);
  private readonly projectsService = inject(ProjectsService);
  private readonly dialogRef = inject(BrnDialogRef, { optional: true });
  private readonly dialogContext = injectBrnDialogContext<{
    item?: Projects | null;
    onSave?: () => void;
  }>({
    optional: true,
  });

  // Check if we're in edit mode
  readonly isEditMode = computed(() => !!this.dialogContext?.item);

  // Form group with all controls
  readonly form: FormGroup = this.fb.group({
    project_name: ['', [Validators.required]],
  });

  constructor() {
    // Populate form if editing existing item
    const item = this.dialogContext?.item;
    if (item) {
      this.form.patchValue({
        project_name: item.project_name || '',
      });
    }
  }

  // Computed form validity
  readonly isFormValid = computed(() => this.form.valid);

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
      project_name: 'Project Name',
    };
    return labels[fieldName] || fieldName;
  }

  onSave(): void {
    if (this.form.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.form.getRawValue(); // Use getRawValue to get disabled fields too

    const item: Projects = {
      project_name: formValue.project_name,
    };

    // Use addProjects method for both create and update
    this.projectsService.addProjects(item).subscribe({
      next: (response) => {
        console.log(
          `Project ${this.isEditMode() ? 'updated' : 'saved'} successfully:`,
          response
        );
        // Call callback if provided (to reload data in parent)
        this.dialogContext?.onSave?.();
        this.dialogRef?.close();
        this.form.reset();
      },
      error: (error) => {
        console.error('Error saving project:', error);
        // TODO: Show error message to user
      },
    });
  }

  onCancel(): void {
    // Dialog will close automatically via brnDialogClose
    this.form.reset();
  }
}
