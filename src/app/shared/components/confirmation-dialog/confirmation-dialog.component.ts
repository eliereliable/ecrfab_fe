import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideAlertTriangle,
  lucideCheckCircle,
  lucideInfo,
  lucideXCircle,
} from '@ng-icons/lucide';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmIconImports } from '@spartan-ng/helm/icon';

export type ConfirmationDialogType = 'warning' | 'danger' | 'info' | 'success';

export interface ConfirmationDialogContext {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmationDialogType;
  onConfirm?: () => void;
}

export interface ConfirmationDialogResult {
  confirmed: boolean;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, HlmButtonImports, HlmDialogImports, HlmIconImports],
  providers: [
    provideIcons({
      lucideAlertTriangle,
      lucideInfo,
      lucideCheckCircle,
      lucideXCircle,
    }),
  ],
  template: `
    <div class="confirmation-dialog max-w-md text-center">
      <!-- Dialog Header -->
      <hlm-dialog-header class="space-y-2">
        <h3 hlmDialogTitle class="text-xl font-semibold">
          {{ context.title }}
        </h3>
        <p hlmDialogDescription class="text-sm text-[var(--text-secondary)]">
          {{ context.message }}
        </p>
      </hlm-dialog-header>

      <!-- Dialog Footer -->
      <hlm-dialog-footer class="mt-6">
        <div class="flex justify-center gap-3 w-full">
          <button
            hlmBtn
            type="button"
            variant="outline"
            class="min-w-[100px]"
            (click)="onCancel()"
          >
            {{ context.cancelText || 'Cancel' }}
          </button>
          <button
            hlmBtn
            type="button"
            [variant]="confirmButtonVariant"
            class="min-w-[100px]"
            (click)="onConfirm()"
          >
            {{ context.confirmText || 'Confirm' }}
          </button>
        </div>
      </hlm-dialog-footer>
    </div>
  `,
  styles: [
    `
      .confirmation-dialog {
        min-width: 360px;
      }
    `,
  ],
})
export class ConfirmationDialogComponent {
  private readonly _dialogRef = inject(BrnDialogRef);
  readonly context = injectBrnDialogContext<ConfirmationDialogContext>();

  get dialogType(): ConfirmationDialogType {
    return this.context?.type || 'warning';
  }

  get confirmButtonVariant():
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link' {
    switch (this.dialogType) {
      case 'danger':
        return 'destructive';
      default:
        return 'default';
    }
  }

  onConfirm(): void {
    const result: ConfirmationDialogResult = { confirmed: true };
    // Call the callback if provided
    this.context?.onConfirm?.();
    this._dialogRef.close(result);
  }

  onCancel(): void {
    const result: ConfirmationDialogResult = { confirmed: false };
    this._dialogRef.close(result);
  }
}
