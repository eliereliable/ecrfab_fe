import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideFileText,
  lucideSave,
  lucideX,
} from '@ng-icons/lucide';
import { BrnDialogClose } from '@spartan-ng/brain/dialog';
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

import { ErlGlossaryItem } from '../erl-glossary.model';

// Custom validators
function dateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null; // Optional dates
  const date = new Date(control.value);
  return isNaN(date.getTime()) ? { invalidDate: true } : null;
}

function nonNegativeIntegerValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value === null || control.value === '') return null;
  const value = Number(control.value);
  return value >= 0 && Number.isInteger(value) ? null : { invalidNumber: true };
}

function percentageValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value === null || control.value === '') return null;
  const value = Number(control.value);
  return value >= 0 && value <= 100 ? null : { invalidPercentage: true };
}

@Component({
  selector: 'app-erl-glossary-detail',
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
      lucideCalendar,
      lucideFileText,
      lucideSave,
      lucideX,
    }),
  ],
  templateUrl: './erl-glossary-detail.component.html',
  styleUrl: './erl-glossary-detail.component.scss',
})
export class ErlGlossaryDetailComponent {
  private readonly fb = inject(FormBuilder);

  // Form group with all controls
  readonly form: FormGroup = this.fb.group({
    keyEvent: ['', [Validators.required]],
    oqeCategory: ['', [Validators.required]],
    documentId: ['', [Validators.required]],
    workItemNo: ['', [Validators.required]],
    workItemPara: [''],
    workItemTitle: [''],
    title: ['', [Validators.required]],
    governmentResponse: [''],
    location: [''],
    criteria: [''],
    nsiNo: [''],
    nsiPara: [''],
    inspectionType: [''],
    inspectionScope: [''],
    inspectionResults: [''],
    startDate: ['', [dateValidator]],
    submissionDate: ['', [dateValidator]],
    completionDate: ['', [dateValidator]],
    reportDueDate: ['', [dateValidator]],
    baselineStart: ['', [dateValidator]],
    baselineFinish: ['', [dateValidator]],
    durationDays: [null, [nonNegativeIntegerValidator]],
    plannedPercentComplete: [null, [percentageValidator]],
    actualPercentComplete: [null, [percentageValidator]],
    system: [''],
    remarks: [''],
    repairActivity: [''],
    cfrXref: [''],
    status: [''],
    oqeCertStatus: [''],
  });

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
    if (control.hasError('invalidDate')) {
      return 'Invalid date format';
    }
    if (control.hasError('invalidNumber')) {
      return 'Must be a non-negative integer';
    }
    if (control.hasError('invalidPercentage')) {
      return 'Must be between 0 and 100';
    }
    return null;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      keyEvent: 'Key Event',
      oqeCategory: 'OQE Category',
      documentId: 'Document ID',
      workItemNo: 'Work Item No',
      title: 'Title',
    };
    return labels[fieldName] || fieldName;
  }

  // Options for select fields
  readonly oqeCategoryOptions = ['CFR', 'IPS', 'RR', 'WAF', 'NSI'];
  readonly inspectionTypeOptions = [
    'Visual',
    'Functional',
    'NDT',
    'Review',
    'Other',
  ];
  readonly inspectionScopeOptions = ['Partial', 'Final', 'N/A'];
  readonly inspectionResultsOptions = ['Sat', 'Unsat', 'In Progress', 'N/A'];
  readonly statusOptions = [
    'Complete',
    'In Progress',
    'On Hold',
    'Pending',
    'Cancelled',
  ];
  readonly oqeCertStatusOptions = [
    'Complete',
    'Remaining',
    'Submitted',
    'Pending',
  ];

  onSave(): void {
    if (this.form.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.form.value;

    const item: ErlGlossaryItem = {
      keyEvent: formValue.keyEvent,
      oqeCategory: formValue.oqeCategory,
      documentId: formValue.documentId,
      workItemNo: formValue.workItemNo,
      workItemPara: formValue.workItemPara || '',
      workItemTitle: formValue.workItemTitle || '',
      title: formValue.title,
      governmentResponse: formValue.governmentResponse || '',
      location: formValue.location || '',
      criteria: formValue.criteria || '',
      nsiNo: formValue.nsiNo || '',
      nsiPara: formValue.nsiPara || '',
      inspectionType: formValue.inspectionType || '',
      inspectionScope: formValue.inspectionScope || '',
      inspectionResults: formValue.inspectionResults || '',
      startDate: formValue.startDate ? new Date(formValue.startDate) : null,
      submissionDate: formValue.submissionDate
        ? new Date(formValue.submissionDate)
        : null,
      completionDate: formValue.completionDate
        ? new Date(formValue.completionDate)
        : null,
      reportDueDate: formValue.reportDueDate
        ? new Date(formValue.reportDueDate)
        : null,
      baselineStart: formValue.baselineStart
        ? new Date(formValue.baselineStart)
        : null,
      baselineFinish: formValue.baselineFinish
        ? new Date(formValue.baselineFinish)
        : null,
      durationDays: formValue.durationDays,
      plannedPercentComplete: formValue.plannedPercentComplete,
      actualPercentComplete: formValue.actualPercentComplete,
      system: formValue.system || '',
      remarks: formValue.remarks || '',
      repairActivity: formValue.repairActivity || '',
      cfrXref: formValue.cfrXref || '',
      status: formValue.status || '',
      oqeCertStatus: formValue.oqeCertStatus || '',
    };

    console.log('Saving ERL item:', item);
    // TODO: Emit event or call service to save
  }

  onCancel(): void {
    // Dialog will close automatically via brnDialogClose
    this.form.reset();
  }
}
