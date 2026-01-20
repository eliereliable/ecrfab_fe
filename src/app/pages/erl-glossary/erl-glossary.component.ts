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
  lucideRefreshCw,
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
import { ErlGlossaryDetailComponent } from './erl-glossary-detail/erl-glossary-detail.component';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogContext,
  ConfirmationDialogResult,
} from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

import { ErlGlossaryItem, erlGlossaryColumns } from './erl-glossary.model';
import { ErlGlossaryService } from './erl-glossary.service';

@Component({
  selector: 'app-erl-glossary',
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
      lucideRefreshCw,
      lucidePlus,
      lucideEdit,
      lucideTrash2,
    }),
  ],
  templateUrl: './erl-glossary.component.html',
  styleUrl: './erl-glossary.component.scss',
})
export class ErlGlossaryComponent implements OnInit, OnDestroy {
  private readonly dialogService = inject(HlmDialogService);
  private readonly erlGlossaryService = inject(ErlGlossaryService);

  // Data signals
  protected readonly data = signal<ErlGlossaryItem[]>([]);
  protected readonly columns = signal(erlGlossaryColumns);
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
    this.erlGlossaryService.getERLGlossaryList(query || undefined).subscribe({
      next: (response: any) => {
        // Handle API response - adjust based on your API structure
        const items = response?.items || response || [];
        this.data.set(Array.isArray(items) ? items : []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading ERL Glossary data:', error);
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

  onRefresh(): void {
    this.loadData();
  }

  onImport(): void {
    // In a real app, you would import from Excel/CSV
    console.log('Importing data...');
  }

  onAddNew(): void {
    this.dialogService.open(ErlGlossaryDetailComponent, {
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

  onEdit(item: ErlGlossaryItem): void {
    this.dialogService.open(ErlGlossaryDetailComponent, {
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

  onDelete(item: ErlGlossaryItem): void {
    const dialogContext: ConfirmationDialogContext = {
      title: 'Delete ERL Glossary Item',
      message: `Are you sure you want to delete "${item.colmn_header}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: () => {
        // Perform the delete action when confirmed
        this.erlGlossaryService
          .deleteERLGlossaryItem((item.id as number) || 0)
          .subscribe({
            next: (response) => {
              console.log('ERL Glossary item deleted successfully:', response);
              toast.success('ERL Glossary item deleted successfully');
              this.loadData();
            },
            error: (error) => {
              console.error('Error deleting ERL Glossary item:', error);
              toast.error('Failed to delete ERL Glossary item. Please try again.');
            },
          });
      },
    };

    this.dialogService.open(ConfirmationDialogComponent, {
      context: dialogContext,
    });
  }
}
