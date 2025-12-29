import { ColumnDef } from '@tanstack/angular-table';

export interface UssGravelyWafLogItem {
  id?: string;
  wafNumber: string;
  specItem: string;
  ra: string;
  space: string;
  system: string;
  workDescription: string;
  received: Date | string | null;
  requestStart: Date | string | null;
  dateAuthorized: Date | string | null;
  status: string;
  rev: string;
  shipDiv: string;
  tag: string;
  dangerTagsNumberListed: string;
  completedDate: Date | string | null;
  closedDate: Date | string | null;
  raContact: string;
  comments: string;
}

// Helper function to format dates
const formatDate = (value: Date | string | null): string => {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const ussGravelyWafLogColumns: ColumnDef<UssGravelyWafLogItem>[] = [
  {
    accessorKey: 'wafNumber',
    header: 'WAF #',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'specItem',
    header: 'SPEC ITEM',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'ra',
    header: 'RA',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'space',
    header: 'SPACE',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'system',
    header: 'SYSTEM',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'workDescription',
    header: 'WORK DESCRIPTION',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'received',
    header: 'RECEIVED',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'requestStart',
    header: 'REQUEST START',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'dateAuthorized',
    header: 'DATE AUTHORIZED',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'rev',
    header: 'REV',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'shipDiv',
    header: 'Ship DIV',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'tag',
    header: 'TAG',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'dangerTagsNumberListed',
    header: 'Danger tags # listed',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'completedDate',
    header: 'COMPLETED DATE',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'closedDate',
    header: 'CLOSED DATE',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'raContact',
    header: 'RA CONTACT',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'comments',
    header: 'COMMENTS',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
];

// Mock data based on the image
export const mockUssGravelyWafLogData: UssGravelyWafLogItem[] = [
  {
    id: '1',
    wafNumber: 'DDG107-26-001',
    specItem: '624-11-001',
    ra: 'ECR/OSM',
    space: '4-122-2-T, 4-220-2-T, 250-2-T & 4-296-1-T',
    system: '4 Escape Trunk Balance Joiner doors',
    workDescription: 'Remove existing, store & reinstall existing',
    received: '2025-10-31',
    requestStart: '2026-01-12',
    dateAuthorized: null,
    status: '',
    rev: '',
    shipDiv: '',
    tag: '',
    dangerTagsNumberListed: '',
    completedDate: null,
    closedDate: null,
    raContact: 'Gary Ritchey 757-879-6590',
    comments: '',
  },
];

