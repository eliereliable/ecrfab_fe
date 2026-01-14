import { ColumnDef } from '@tanstack/angular-table';

export interface ErlGlossaryItem {
  id: number | null;
  colmn_header: string;
  description: string;
  data_type: string;
  ips: boolean;
  t_i_plan: boolean;
  cfr_log: boolean;
  rr_list: boolean;
  itstp: boolean;
  waf_log: boolean;
}

// Helper function to format boolean values
const formatBoolean = (value: boolean | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  return value ? 'Yes' : 'No';
};

export const erlGlossaryColumns: ColumnDef<ErlGlossaryItem>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'colmn_header',
    header: 'Column Header',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'data_type',
    header: 'Data Type',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'ips',
    header: 'IPS',
    cell: (info) => formatBoolean(info.getValue() as boolean | null),
    enableSorting: true,
  },
  {
    accessorKey: 't_i_plan',
    header: 'T/I Plan',
    cell: (info) => formatBoolean(info.getValue() as boolean | null),
    enableSorting: true,
  },
  {
    accessorKey: 'cfr_log',
    header: 'CFR Log',
    cell: (info) => formatBoolean(info.getValue() as boolean | null),
    enableSorting: true,
  },
  {
    accessorKey: 'rr_list',
    header: 'RR List',
    cell: (info) => formatBoolean(info.getValue() as boolean | null),
    enableSorting: true,
  },
  {
    accessorKey: 'itstp',
    header: 'ITSTP',
    cell: (info) => formatBoolean(info.getValue() as boolean | null),
    enableSorting: true,
  },
  {
    accessorKey: 'waf_log',
    header: 'WAF Log',
    cell: (info) => formatBoolean(info.getValue() as boolean | null),
    enableSorting: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => '', // Cell content will be handled by template
    enableSorting: false,
  },
];
