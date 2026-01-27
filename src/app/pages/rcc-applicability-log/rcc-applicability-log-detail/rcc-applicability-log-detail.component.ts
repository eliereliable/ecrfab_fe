import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSave } from '@ng-icons/lucide';
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
import { toast } from 'ngx-sonner';

import { RccApplicabilityLog } from '../rcc-applicability-log.model';
import { RccApplicabilityLogService } from '../rcc-applicability-log.service';
import { ProjectsService } from '../../projects/projects.service';
import { Projects } from '../../projects/projects.model';
import { injectBrnDialogContext } from '@spartan-ng/brain/dialog';

@Component({
  selector: 'app-rcc-applicability-log-detail',
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
    }),
  ],
  templateUrl: './rcc-applicability-log-detail.component.html',
  styleUrl: './rcc-applicability-log-detail.component.scss',
})
export class RccApplicabilityLogDetailComponent {
  private readonly fb = inject(FormBuilder);
  private readonly rccApplicabilityLogService = inject(RccApplicabilityLogService);
  private readonly projectsService = inject(ProjectsService);
  private readonly dialogRef = inject(BrnDialogRef, { optional: true });
  private readonly dialogContext = injectBrnDialogContext<{
    item?: RccApplicabilityLog | null;
    onSave?: () => void;
  }>({
    optional: true,
  });

  // Check if we're in edit mode
  readonly isEditMode = computed(() => !!this.dialogContext?.item);

  // Projects signal
  readonly projects = signal<Projects[]>([]);

  // Form group with all controls
  readonly form: FormGroup = this.fb.group({
    project_id: ['', [Validators.required]],
    rcc_num: ['', [Validators.required]],
    spec_item: ['', [Validators.required]],
    wi_para: ['', [Validators.required]],
    action_cat: ['', [Validators.required]],
    comments: [''],
    cfr: ['', [Validators.required]],
  });

  constructor() {
    // Load projects
    this.loadProjects();

    // Populate form if editing existing item
    const item = this.dialogContext?.item;
    if (item) {
      this.form.patchValue({
        project_id: item.project_id || '',
        rcc_num: item.rcc_num || '',
        spec_item: item.spec_item || '',
        wi_para: item.wi_para || '',
        action_cat: item.action_cat || '',
        comments: item.comments || '',
        cfr: item.cfr || '',
      });
    }
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
      project_id: 'Project',
      rcc_num: 'RCC Number',
      spec_item: 'Spec Item',
      wi_para: 'WI Para',
      action_cat: 'Action Category',
      comments: 'Comments',
      cfr: 'CFR',
    };
    return labels[fieldName] || fieldName;
  }

  onSave(): void {
    if (this.form.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      toast.error('Please fill in all required fields');
      return;
    }

    const formValue = this.form.value;

    const existingItem = this.dialogContext?.item;
    const item: RccApplicabilityLog = {
      id: existingItem?.id,
      project_id: formValue.project_id,
      rcc_num: formValue.rcc_num,
      spec_item: formValue.spec_item,
      wi_para: formValue.wi_para,
      action_cat: formValue.action_cat,
      comments: formValue.comments || '',
      cfr: formValue.cfr,
    };

    // Use add method for both create and update
    this.rccApplicabilityLogService.addRccApplicabilityLogItem(item).subscribe({
      next: (response) => {
        console.log(
          `RCC Applicability Log ${
            existingItem ? 'updated' : 'saved'
          } successfully:`,
          response
        );
        toast.success(`RCC Applicability Log ${existingItem ? 'updated' : 'created'} successfully`);
        // Call callback if provided (to reload data in parent)
        this.dialogContext?.onSave?.();
        this.dialogRef?.close();
        this.form.reset();
      },
      error: (error) => {
        console.error('Error saving RCC Applicability Log:', error);
      },
    });
  }

  onCancel(): void {
    // Dialog will close automatically via brnDialogClose
    this.form.reset();
  }
}
