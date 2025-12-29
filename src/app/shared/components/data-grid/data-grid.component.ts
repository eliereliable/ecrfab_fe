import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  input,
  Input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import {
  lucideArrowDown,
  lucideArrowUp,
  lucideArrowUpDown,
  lucideChevronDown,
  lucideImage,
  lucideLayoutList,
  lucideRefreshCw,
  lucideToggleLeft,
  lucideToggleRight,
  lucideTrash,
  lucideUpload,
} from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  type ColumnDef,
  type ColumnFiltersState,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-data-grid',
  imports: [
    CommonModule,
    FlexRenderDirective,
    FormsModule,
    HlmButtonImports,
    HlmIconImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmTableImports,
  ],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideArrowDown,
      lucideArrowUp,
      lucideArrowUpDown,
      lucideToggleLeft,
      lucideToggleRight,
      lucideTrash,
      lucideLayoutList,
      lucideImage,
      lucideUpload,
      lucideRefreshCw,
    }),
  ],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent {
  dataGrid = input<any[]>([]);
  columns = input<ColumnDef<any>[]>([]);

  // Server-side pagination inputs
  pageIndex = input<number>(0);
  pageSize = input<number>(10);
  totalCount = input<number>(0);

  // Pagination change outputs
  pageChange = output<number>();
  pageSizeChange = output<number>();

  // Server-side sorting inputs
  sorting = input<SortingState>([]);

  // Sorting change output
  sortingChange = output<SortingState>();

  // NEW: Pass in actionsTemplate for the actions column
  @Input() actionsTemplate?: TemplateRef<any>;

  constructor(private sanitizer: DomSanitizer) {
    // Sync external sorting input with internal sorting signal
    effect(() => {
      const externalSorting = this.sorting();
      if (JSON.stringify(externalSorting) !== JSON.stringify(this._sorting())) {
        this._sorting.set(externalSorting);
      }
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    if (typeof html === 'string') {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    return html;
  }

  protected _filterChanged(event: Event) {
    this._table
      .getColumn('email')
      ?.setFilterValue((event.target as HTMLInputElement).value);
  }

  private readonly _columnFilters = signal<ColumnFiltersState>([]);
  private readonly _sorting = signal<SortingState>([]);
  private readonly _rowSelection = signal<RowSelectionState>({});
  private readonly _columnVisibility = signal<VisibilityState>({});

  protected readonly _table = createAngularTable(() => ({
    data: this.dataGrid(),
    columns: this.columns(),
    onSortingChange: (updater) => {
      const newSorting =
        updater instanceof Function ? updater(this._sorting()) : updater;
      this._sorting.set(newSorting);
      this.sortingChange.emit(newSorting);
    },
    onColumnFiltersChange: (updater) => {
      updater instanceof Function
        ? this._columnFilters.update(updater)
        : this._columnFilters.set(updater);
    },
    getCoreRowModel: getCoreRowModel(),
    // Removed getPaginationRowModel() for server-side pagination
    // Removed getSortedRowModel() for server-side sorting
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: true,
    manualSorting: true, // Enable server-side sorting
    onColumnVisibilityChange: (updater) => {
      updater instanceof Function
        ? this._columnVisibility.update(updater)
        : this._columnVisibility.set(updater);
    },
    onRowSelectionChange: (updater) => {
      updater instanceof Function
        ? this._rowSelection.update(updater)
        : this._rowSelection.set(updater);
    },
    state: {
      sorting: this._sorting(),
      columnFilters: this._columnFilters(),
      columnVisibility: this._columnVisibility(),
      rowSelection: this._rowSelection(),
    },
  }));

  // Helper method to get sort icon for a column
  getSortIcon(column: any): string {
    if (!column.getCanSort()) {
      return '';
    }
    const sortDirection = column.getIsSorted();
    if (sortDirection === 'asc') {
      return 'lucideArrowUp';
    } else if (sortDirection === 'desc') {
      return 'lucideArrowDown';
    }
    return 'lucideArrowUpDown';
  }

  // Helper method to convert sorting state to API format (e.g., "columnName_desc")
  convertSortingToApiFormat(sorting: SortingState): string {
    if (!sorting || sorting.length === 0) {
      return '';
    }
    const sort = sorting[0];
    return `${sort.id} ${sort.desc ? 'desc' : 'asc'}`;
  }
  protected readonly _hidableColumns = this._table
    .getAllColumns()
    .filter((column) => column.getCanHide());

  protected _filterChange(email: Event) {
    const target = email.target as HTMLInputElement;
    const typedValue = target.value;
    this._table.setGlobalFilter(typedValue);
  }

  // Server-side pagination methods
  onPreviousPage(): void {
    const currentPage = this.pageIndex();
    if (currentPage > 0) {
      this.pageChange.emit(currentPage - 1);
    }
  }

  onNextPage(): void {
    const currentPage = this.pageIndex();
    const totalPages = Math.ceil(this.totalCount() / this.pageSize());
    if (currentPage < totalPages - 1) {
      this.pageChange.emit(currentPage + 1);
    }
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSizeChange.emit(newPageSize);
  }

  // Computed signals for pagination state
  protected readonly canPreviousPage = computed(() => this.pageIndex() > 0);
  protected readonly totalPages = computed(
    () => Math.ceil(this.totalCount() / this.pageSize()) || 1
  );
  protected readonly canNextPage = computed(() => {
    const totalPages = this.totalPages();
    return this.pageIndex() < totalPages - 1;
  });
  protected readonly startIndex = computed(
    () => this.pageIndex() * this.pageSize() + 1
  );
  protected readonly endIndex = computed(() => {
    const end = (this.pageIndex() + 1) * this.pageSize();
    return Math.min(end, this.totalCount());
  });
}
