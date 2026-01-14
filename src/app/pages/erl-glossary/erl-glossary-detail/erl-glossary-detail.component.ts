import { Component, computed, inject } from '@angular/core';
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

import { ErlGlossaryItem } from '../erl-glossary.model';
import { ErlGlossaryService } from '../erl-glossary.service';
import { injectBrnDialogContext } from '@spartan-ng/brain/dialog';

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
      lucideSave,
    }),
  ],
  templateUrl: './erl-glossary-detail.component.html',
  styleUrl: './erl-glossary-detail.component.scss',
})
export class ErlGlossaryDetailComponent {
  private readonly fb = inject(FormBuilder);
  private readonly erlGlossaryService = inject(ErlGlossaryService);
  private readonly dialogRef = inject(BrnDialogRef, { optional: true });
  private readonly dialogContext = injectBrnDialogContext<{
    item?: ErlGlossaryItem | null;
    onSave?: () => void;
  }>({
    optional: true,
  });

  // Check if we're in edit mode
  readonly isEditMode = computed(() => !!this.dialogContext?.item);

  // Form group with all controls
  readonly form: FormGroup = this.fb.group({
    colmn_header: ['', [Validators.required]],
    description: ['', [Validators.required]],
    data_type: ['', [Validators.required]],
    ips: [false],
    t_i_plan: [false],
    cfr_log: [false],
    rr_list: [false],
    itstp: [false],
    waf_log: [false],
  });

  constructor() {
    // Populate form if editing existing item
    const item = this.dialogContext?.item;
    if (item) {
      this.form.patchValue({
        colmn_header: item.colmn_header || '',
        description: item.description || '',
        data_type: item.data_type || '',
        ips: item.ips || false,
        t_i_plan: item.t_i_plan || false,
        cfr_log: item.cfr_log || false,
        rr_list: item.rr_list || false,
        itstp: item.itstp || false,
        waf_log: item.waf_log || false,
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
      colmn_header: 'Column Header',
      description: 'Description',
      data_type: 'Data Type',
    };
    return labels[fieldName] || fieldName;
  }

  // Options for select fields
  readonly dataTypeOptions = [
    'String',
    'Number',
    'Date',
    'Boolean',
    'DateTime',
    'Integer',
    'Decimal',
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

    const existingItem = this.dialogContext?.item;
    const item: ErlGlossaryItem = {
      id: existingItem?.id || 0,
      colmn_header: formValue.colmn_header,
      description: formValue.description,
      data_type: formValue.data_type,
      ips: formValue.ips || false,
      t_i_plan: formValue.t_i_plan || false,
      cfr_log: formValue.cfr_log || false,
      rr_list: formValue.rr_list || false,
      itstp: formValue.itstp || false,
      waf_log: formValue.waf_log || false,
    };

    // Use add method for both create and update (backend handles it based on ID)
    this.erlGlossaryService.addERLGlossaryItem(item).subscribe({
      next: (response) => {
        console.log(
          `ERL Glossary item ${
            existingItem ? 'updated' : 'saved'
          } successfully:`,
          response
        );
        // Call callback if provided (to reload data in parent)
        this.dialogContext?.onSave?.();
        this.dialogRef?.close();
        this.form.reset();
      },
      error: (error) => {
        console.error('Error saving ERL Glossary item:', error);
        // TODO: Show error message to user
      },
    });
  }

  onCancel(): void {
    // Dialog will close automatically via brnDialogClose
    this.form.reset();
  }
}
