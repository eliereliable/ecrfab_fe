import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import {
  lucideFilter,
  lucideRefreshCw,
  lucideSearch,
  lucideUpload,
} from '@ng-icons/lucide';
import { SortingState } from '@tanstack/angular-table';

import { HlmIcon } from '@libs/ui/icon';
import { NgIcon } from '@ng-icons/core';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';

import {
  UssGravelyRequiredReportLogItem,
  mockUssGravelyRequiredReportLogData,
  ussGravelyRequiredReportLogColumns,
} from './uss-gravely-required-report-log.model';

@Component({
  selector: 'app-uss-gravely-required-report-log',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataGridComponent,
    HlmButtonImports,
    NgIcon,
    HlmIcon,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      lucideFilter,
      lucideUpload,
      lucideRefreshCw,
    }),
  ],
  templateUrl: './uss-gravely-required-report-log.component.html',
  styleUrl: './uss-gravely-required-report-log.component.scss',
})
export class UssGravelyRequiredReportLogComponent {
  // Data signals
  protected readonly data = signal<UssGravelyRequiredReportLogItem[]>(
    mockUssGravelyRequiredReportLogData
  );
  protected readonly columns = signal(ussGravelyRequiredReportLogColumns);

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
        item.vesselNameAndHull?.toLowerCase().includes(query) ||
        item.contract?.toLowerCase().includes(query) ||
        item.ecrJobOrder?.toLowerCase().includes(query) ||
        item.title?.toLowerCase().includes(query) ||
        item.navyItemNumber?.toLowerCase().includes(query) ||
        item.stdItem?.toLowerCase().includes(query) ||
        item.cfrNmdNumber?.toLowerCase().includes(query)
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

  onUpload(): void {
    // In a real app, you would upload a file
    console.log('Uploading file...');
  }
}
