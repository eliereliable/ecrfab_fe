import { ColumnDef } from '@tanstack/angular-table';

export interface JsrItem {
  id?: string;
  taskNum: string;
  taskNote: string;
  taskRa: string;
  taskJob: string;
  specItem: string;
  compPercent: number | string;
  mod: string;
  clin: string;
  budgetHrs: number | string;
  budgetOtHrs: number | string;
  actualTotal: number | string;
  actualOt: number | string;
  averageLabor: number | string;
  eacLabor: number | string;
  budgetMaterial: number | string;
  actualMaterial: number | string;
  eacMaterial: number | string;
  budgetSub: number | string;
  actualSub: number | string;
  eacSub: number | string;
  zeroCostRevenue: number | string;
  contractValue: number | string;
  currentDirect: number | string;
  eacEac: number | string;
  projectedMargin: number | string;
  projectedProfitPercent: number | string;
}

// Helper function to format numbers with 2 decimal places
const formatNumber = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') return '0.00';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Helper function to format percentages
const formatPercent = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') return '0.00 %';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0.00 %';
  return `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;
};

export const jsrColumns: ColumnDef<JsrItem>[] = [
  {
    accessorKey: 'taskNum',
    header: 'Task Num',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'taskNote',
    header: 'Task Note',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'taskRa',
    header: 'Task RA',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'taskJob',
    header: 'Task Job',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'specItem',
    header: 'Spec Item',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'compPercent',
    header: 'Comp %',
    cell: (info) => formatPercent(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'mod',
    header: 'Mod',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'clin',
    header: 'CLIN',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'budgetHrs',
    header: 'Budget Hrs',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'budgetOtHrs',
    header: 'Budget OT Hrs',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'actualTotal',
    header: 'Actual Total',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'actualOt',
    header: 'Actual OT',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'averageLabor',
    header: 'Average Labor',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'eacLabor',
    header: 'EAC Labor',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'budgetMaterial',
    header: 'Budget Material',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'actualMaterial',
    header: 'Actual Material',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'eacMaterial',
    header: 'EAC Material',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'budgetSub',
    header: 'Budget Sub',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'actualSub',
    header: 'Actual Sub',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'eacSub',
    header: 'EAC Sub',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'zeroCostRevenue',
    header: 'Zero Cost Revenue',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'contractValue',
    header: 'Contract Value',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'currentDirect',
    header: 'Current Direct',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'eacEac',
    header: 'EAC EAC',
    cell: (info) => formatPercent(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'projectedMargin',
    header: 'Projected Margin',
    cell: (info) => formatPercent(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'projectedProfitPercent',
    header: 'Projected Profit %',
    cell: (info) => {
      const value = info.getValue() as number | string | null;
      if (value === null || value === undefined || value === '') return '0';
      return String(value);
    },
    enableSorting: true,
  },
];

// Mock data based on the image
export const mockJsrData: JsrItem[] = [
  {
    id: '1',
    taskNum: '000',
    taskNote: '',
    taskRa: 'VA',
    taskJob: 'Admin Item',
    specItem: 'COD',
    compPercent: 0.00,
    mod: '',
    clin: '',
    budgetHrs: 0.00,
    budgetOtHrs: 0.00,
    actualTotal: 1166.00,
    actualOt: 13.00,
    averageLabor: 54.18,
    eacLabor: 1166.00,
    budgetMaterial: 0.00,
    actualMaterial: 0.00,
    eacMaterial: 0.00,
    budgetSub: 0.00,
    actualSub: 0.00,
    eacSub: 0.00,
    zeroCostRevenue: 0.00,
    contractValue: 0.00,
    currentDirect: 63176.21,
    eacEac: 11943358.00,
    projectedMargin: 0.00,
    projectedProfitPercent: 0,
  },
];

