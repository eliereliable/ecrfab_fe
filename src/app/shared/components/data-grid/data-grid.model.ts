import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/angular-table';

export interface DataGrid {
  columns: ColumnDef<any>[];
  data: any[];
  pageSize: number;
  pageIndex: number;
  total: number;
  totalPages: number;
  pageSizeOptions: number[];
  sort: SortingState;
  filter: ColumnFiltersState;
  rowSelection: RowSelectionState;
  columnVisibility: VisibilityState;
}
