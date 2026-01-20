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
import { ImportFilesDetailComponent } from './import-files-detail/import-files-detail.component';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogContext,
  ConfirmationDialogResult,
} from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

import { Files, importFilesColumns } from './import-files.model';
import { ImportFilesService } from './import-files.service';

@Component({
  selector: 'app-import-files',
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
  templateUrl: './import-files.component.html',
  styleUrl: './import-files.component.scss',
})
export class ImportFilesComponent implements OnInit, OnDestroy {
  private readonly dialogService = inject(HlmDialogService);
  private readonly importFilesService = inject(ImportFilesService);

  // Data signals
  protected readonly data = signal<Files[]>([]);
  protected readonly columns = signal(importFilesColumns);
  protected readonly loading = signal<boolean>(false);

  // Pagination signals
  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal(10);
  protected readonly totalCount = signal(0);

  // Sorting signal
  protected readonly sorting = signal<SortingState>([]);

  // Search/filter signal
  protected readonly searchQuery = signal('');

  // Subject for debounced search
  private readonly searchSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  // Paginated data
  protected readonly paginatedData = computed(() => {
    return this.data();
  });

  // Computed total for results
  protected readonly filteredTotalCount = computed(() => this.totalCount());

  ngOnInit(): void {
    // Subscribe to debounced search
    this.searchSubject
      .pipe(
        debounceTime(1000), // Wait 1000ms after user stops typing
        distinctUntilChanged(), // Only emit if value changed
        takeUntil(this.destroy$)
      )
      .subscribe((query) => {
        this.loadData();
      });

    // Load initial data
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject.complete();
  }

  private loadData(): void {
    this.loading.set(true);
    const page = this.pageIndex() + 1; // API uses 1-based pagination
    const size = this.pageSize();

    this.importFilesService.getImportFiles(page, size).subscribe({
      next: (response) => {
        this.data.set(response.items || []);
        this.totalCount.set(response.total || 0);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading Import Files data:', error);
        this.loading.set(false);
        this.data.set([]);
        this.totalCount.set(0);
      },
    });
  }

  // Event handlers
  onPageChange(page: number): void {
    this.pageIndex.set(page);
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.pageIndex.set(0); // Reset to first page
    this.loadData();
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
    this.dialogService.open(ImportFilesDetailComponent, {
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

  onEdit(item: Files): void {
    this.dialogService.open(ImportFilesDetailComponent, {
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

  onDelete(item: Files): void {
    const dialogContext: ConfirmationDialogContext = {
      title: 'Delete Import File',
      message: `Are you sure you want to delete "${item.file_name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: () => {
        // Perform the delete action when confirmed
        this.importFilesService
          .deleteImportFiles(item.category_id || 0)
          .subscribe({
            next: (response) => {
              console.log('Import file deleted successfully:', response);
              toast.success('Import file deleted successfully');
              this.loadData();
            },
            error: (error) => {
              console.error('Error deleting import file:', error);
              toast.error('Failed to delete import file. Please try again.');
            },
          });
      },
    };

    this.dialogService.open(ConfirmationDialogComponent, {
      context: dialogContext,
    });
  }
}
