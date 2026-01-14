import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideFilter,
  lucidePlus,
  lucideRefreshCw,
  lucideSearch,
  lucideUpload,
} from '@ng-icons/lucide';
import { SortingState } from '@tanstack/angular-table';

import { HlmIcon } from '@libs/ui/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmDialogService } from '@libs/ui/dialog';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { ErlGlossaryDetailComponent } from './erl-glossary-detail/erl-glossary-detail.component';

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
    }),
  ],
  templateUrl: './erl-glossary.component.html',
  styleUrl: './erl-glossary.component.scss',
})
export class ErlGlossaryComponent implements OnInit {
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

  // Filtered data
  protected readonly filteredData = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.data();

    return this.data().filter((item) => {
      return (
        item.colmn_header?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.data_type?.toLowerCase().includes(query) ||
        item.id?.toString().includes(query)
      );
    });
  });

  // Paginated data
  protected readonly paginatedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredData().slice(start, end);
  });

  // Computed total for filtered results
  protected readonly filteredTotalCount = computed(
    () => this.filteredData().length
  );

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);
    this.erlGlossaryService.getERLGlossaryList().subscribe({
      next: (response: any) => {
        // Handle API response - adjust based on your API structure
        const items = response?.data || response || [];
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
    this.searchQuery.set(target.value);
    this.pageIndex.set(0); // Reset to first page on search
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
        onSave: () => {
          // Reload data after successful save
          this.loadData();
        },
      },
    });
  }
}
