import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideEdit,
  lucideFilter,
  lucidePlus,
  lucideSearch,
  lucideTrash2,
  lucideUpload,
} from '@ng-icons/lucide';
import { SortingState } from '@tanstack/angular-table';
import { toast } from 'ngx-sonner';

import { HlmIcon } from '@libs/ui/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmDialogService } from '@libs/ui/dialog';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { RccApplicabilityLogDetailComponent } from './rcc-applicability-log-detail/rcc-applicability-log-detail.component';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogContext,
  ConfirmationDialogResult,
} from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

import { RccApplicabilityLog, rccApplicabilityLogColumns, RccApplicabilityLogResponse } from './rcc-applicability-log.model';
import { RccApplicabilityLogService } from './rcc-applicability-log.service';

@Component({
  selector: 'app-rcc-applicability-log',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataGridComponent,
    HlmButtonImports,
    NgIcon,
    HlmIcon,
    HlmInputImports,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      lucideFilter,
      lucideUpload,
      lucidePlus,
      lucideEdit,
      lucideTrash2,
    }),
  ],
  templateUrl: './rcc-applicability-log.component.html',
  styleUrl: './rcc-applicability-log.component.scss',
})
export class RccApplicabilityLogComponent implements OnInit, OnDestroy {
  private readonly dialogService = inject(HlmDialogService);
  private readonly rccApplicabilityLogService = inject(RccApplicabilityLogService);

  // Data signals
  protected readonly data = signal<RccApplicabilityLog[]>([]);
  protected readonly columns = signal(rccApplicabilityLogColumns);
  protected readonly loading = signal<boolean>(false);

  // Pagination signals
  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal(10);
  protected readonly totalCount = computed(() => this.data().length);

  // Sorting signal
  protected readonly sorting = signal<SortingState>([]);

  // Search/filter signal
  protected readonly searchQuery = signal('');

  // Subject for debounced search
  private readonly searchSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  // Paginated data (no client-side filtering, data comes from API)
  protected readonly paginatedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.data().slice(start, end);
  });

  // Computed total for results
  protected readonly filteredTotalCount = computed(() => this.data().length);

  ngOnInit(): void {
    // Subscribe to debounced search
    this.searchSubject
      .pipe(
        debounceTime(1000), // Wait 1000ms after user stops typing
        distinctUntilChanged(), // Only emit if value changed
        takeUntil(this.destroy$)
      )
      .subscribe((query) => {
        this.loadData(query);
      });

    // Load initial data
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject.complete();
  }

  private loadData(searchQuery?: string): void {
    this.loading.set(true);
    // Use searchQuery if provided, otherwise use the signal value
    const query = searchQuery !== undefined ? searchQuery : this.searchQuery();
    this.rccApplicabilityLogService.getRccApplicabilityLog().subscribe({
      next: (response: RccApplicabilityLogResponse) => {
        // Handle API response - adjust based on your API structure
        const items = response?.value?.items || [];
        this.data.set(Array.isArray(items) ? items : []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading RCC Applicability Log data:', error);
        this.loading.set(false);
        // Optionally set empty array on error
        this.data.set([]);
      },
    });
  }

  // Event handlers
  onPageChange(page: number): void {
    this.pageIndex.set(page);
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.pageIndex.set(0); // Reset to first page
  }

  onSortingChange(sorting: SortingState): void {
    this.sorting.set(sorting);
    // In a real app, you would call an API with sorting params
    console.log('Sorting changed:', sorting);
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value;
    this.searchQuery.set(query);
    this.pageIndex.set(0); // Reset to first page on search
    // Push to subject for debounced API call
    this.searchSubject.next(query);
  }

  onAddNew(): void {
    this.dialogService.open(RccApplicabilityLogDetailComponent, {
      contentClass: '!max-w-6xl !w-[35rem]',
      context: {
        item: null, // New item
        onSave: () => {
          // Reload data after successful save
          this.loadData();
        },
      },
    });
  }

  onEdit(item: RccApplicabilityLog): void {
    this.dialogService.open(RccApplicabilityLogDetailComponent, {
      contentClass: '!max-w-6xl !w-[35rem]',
      context: {
        item: item, // Existing item to edit
        onSave: () => {
          // Reload data after successful save
          this.loadData();
        },
      },
    });
  }

  onDelete(item: RccApplicabilityLog): void {
    const dialogContext: ConfirmationDialogContext = {
      title: 'Delete RCC Applicability Log',
      message: `Are you sure you want to delete RCC "${item.rcc_num}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: () => {
        // Perform the delete action when confirmed
        this.rccApplicabilityLogService
          .deleteRccApplicabilityLogItem(parseInt(item.id || '0'))
          .subscribe({
            next: (response) => {
              console.log('RCC Applicability Log deleted successfully:', response);
              toast.success('RCC Applicability Log deleted successfully');
              this.loadData();
            },
            error: (error) => {
              console.error('Error deleting RCC Applicability Log:', error);
              toast.error('Failed to delete RCC Applicability Log. Please try again.');
            },
          });
      },
    };

    this.dialogService.open(ConfirmationDialogComponent, {
      context: dialogContext,
    });
  }
}
