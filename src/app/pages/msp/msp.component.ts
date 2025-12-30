import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import {
  lucideFilter,
  lucideRefreshCw,
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

import { MspItem, mockMspData, mspColumns } from './msp.model';

@Component({
  selector: 'app-msp',
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
      lucideFilter,
      lucideUpload,
      lucideRefreshCw,
    }),
  ],
  templateUrl: './msp.component.html',
  styleUrl: './msp.component.scss',
})
export class MspComponent {
  // Data signals
  protected readonly data = signal<MspItem[]>(mockMspData);
  protected readonly columns = signal(mspColumns);

  // Pagination signals
  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal(10);
  protected readonly totalCount = computed(() => this.data().length);

  // Sorting signal
  protected readonly sorting = signal<SortingState>([]);

  // Project filter signal
  protected readonly projectOptions = [
    'USS GRAVELY (DDG-107) FY26 SRA',
    'Project 2',
    'Project 3',
  ];
  protected readonly selectedProject = signal<string>(
    'USS GRAVELY (DDG-107) FY26 SRA'
  );

  // Filtered data
  protected readonly filteredData = computed(() => this.data());

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

  onRefresh(): void {
    // In a real app, you would reload data from API
    console.log('Refreshing data...');
  }

  onUpload(): void {
    // In a real app, you would upload a file
    console.log('Uploading file...');
  }

  onProjectChange(project: string | string[] | undefined): void {
    if (project && typeof project === 'string') {
      this.selectedProject.set(project);
      this.pageIndex.set(0); // Reset to first page on project change
      // In a real app, you would filter data by project
      console.log('Project changed:', project);
    }
  }
}
