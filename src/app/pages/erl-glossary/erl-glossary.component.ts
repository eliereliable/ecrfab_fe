import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideColumns,
  lucideFilter,
  lucidePlus,
  lucideRefreshCw,
  lucideSearch,
  lucideUpload,
} from '@ng-icons/lucide';
import { SortingState } from '@tanstack/angular-table';

import { HlmIcon } from '@libs/ui/icon';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmDialogService } from '@libs/ui/dialog';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { ErlGlossaryDetailComponent } from './erl-glossary-detail/erl-glossary-detail.component';

import {
  ErlGlossaryItem,
  erlGlossaryColumns,
  mockErlGlossaryData,
} from './erl-glossary.model';

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
    HlmCardImports,
    BrnSelectImports,
    HlmSelectImports,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      lucideFilter,
      lucideUpload,
      lucideRefreshCw,
      lucideColumns,
      lucidePlus,
    }),
  ],
  templateUrl: './erl-glossary.component.html',
  styleUrl: './erl-glossary.component.scss',
})
export class ErlGlossaryComponent {
  private readonly dialogService = inject(HlmDialogService);

  // Data signals
  protected readonly data = signal<ErlGlossaryItem[]>(mockErlGlossaryData);
  protected readonly columns = signal(erlGlossaryColumns);

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
        item.keyEvent?.toLowerCase().includes(query) ||
        item.oqeCategory?.toLowerCase().includes(query) ||
        item.documentId?.toLowerCase().includes(query) ||
        item.workItemNo?.toLowerCase().includes(query) ||
        item.workItemTitle?.toLowerCase().includes(query) ||
        item.title?.toLowerCase().includes(query) ||
        item.status?.toLowerCase().includes(query) ||
        item.location?.toLowerCase().includes(query)
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
    // In a real app, you would reload data from API
    console.log('Refreshing data...');
  }

  onImport(): void {
    // In a real app, you would import from Excel/CSV
    console.log('Importing data...');
  }

  onAddNew(): void {
    this.dialogService.open(ErlGlossaryDetailComponent, {
      contentClass: '!max-w-6xl !w-[35rem]',
    });
  }
}
