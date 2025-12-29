import { ColumnDef } from '@tanstack/angular-table';

export interface TimeByJobItem {
  id?: string;
  employeeName: string;
  badgeNumber: string;
  employeeDivision: string;
  date: Date | string | null;
  project: string;
  task: string;
  item: string;
  repairActivity: string;
  title: string;
  trade: string;
  dept: string;
  hours: number | string;
  timeType: string;
  support: string;
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

// Helper function to format numbers
const formatNumber = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') return '0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  return String(num);
};

export const timeByJobColumns: ColumnDef<TimeByJobItem>[] = [
  {
    accessorKey: 'employeeName',
    header: 'Employee Name',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'badgeNumber',
    header: 'Badge Number',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'employeeDivision',
    header: 'Employee Division',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'project',
    header: 'Project',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'task',
    header: 'Task',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'item',
    header: 'Item',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'repairActivity',
    header: 'Repair Activity',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'trade',
    header: 'Trade',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'dept',
    header: 'Dept',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'hours',
    header: 'Hours',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'timeType',
    header: 'Time Type',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'support',
    header: 'Support',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
];

// Mock data based on the image
export const mockTimeByJobData: TimeByJobItem[] = [
  {
    id: '1',
    employeeName: 'GUTIERREZ, DIEGO',
    badgeNumber: '2334',
    employeeDivision: 'ECR- VA',
    date: '2025-11-10',
    project: '103576',
    task: '000',
    item: '000',
    repairActivity: 'ECR-VA',
    title: 'SENIOR PROJECT MANAGER',
    trade: 'PROJECT MGR',
    dept: 'PD',
    hours: 8,
    timeType: 'ST',
    support: '',
  },
];

