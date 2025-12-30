import { ColumnDef } from '@tanstack/angular-table';

export interface MspItem {
  id?: string;
  workItem: string;
  uniqueId: string;
  taskName: string;
  icn: string;
  keyEventMilestoneSystem: string;
  componentLocation: string;
  executing: string;
  superinten: string;
  baselineS: Date | string | null;
  baselineF: Date | string | null;
  startDate: Date | string | null;
  finishDate: Date | string | null;
  earlyStart: Date | string | null;
  earlyFinish: Date | string | null;
  lateStart: Date | string | null;
  lateFinish: Date | string | null;
  actualStart: Date | string | null;
  actualFinish: Date | string | null;
  percentC: number | string;
  percentW: number | string;
  duration: number | string;
  calendar: string;
  totalFloat: string;
  uniqueId2: string;
  uniqueId3: string;
  constraint: string;
  sowPara: string;
  rccRtr: string;
  summary: string;
}

// Helper function to format dates
const formatDate = (value: Date | string | null): string => {
  if (!value || value === 'NA') return value === 'NA' ? 'NA' : '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper function to format dates with day name
const formatDateWithDay = (value: Date | string | null): string => {
  if (!value || value === 'NA') return value === 'NA' ? 'NA' : '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });
};

// Helper function to format numbers and percentages
const formatNumber = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') return '0';
  if (typeof value === 'string' && value.toLowerCase() === 'na') return 'NA';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  return num.toString();
};

// Helper function to format duration
const formatDuration = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'string') return value;
  return `${value} days`;
};

export const mspColumns: ColumnDef<MspItem>[] = [
  {
    accessorKey: 'workItem',
    header: 'Work_Item',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'uniqueId',
    header: 'Unique_ID',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'taskName',
    header: 'Task_Nam',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'icn',
    header: 'ICN',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'keyEventMilestoneSystem',
    header: 'Key Event Milestone: System',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'componentLocation',
    header: 'Component Location',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'executing',
    header: 'Executing',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'superinten',
    header: 'Superinten',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'baselineS',
    header: 'Baseline_S',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'baselineF',
    header: 'Baseline_F',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'startDate',
    header: 'Start_Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'finishDate',
    header: 'Finish_Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'earlyStart',
    header: 'Early_Start',
    cell: (info) => formatDateWithDay(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'earlyFinish',
    header: 'Early_Finish',
    cell: (info) => formatDateWithDay(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'lateStart',
    header: 'Late_Start',
    cell: (info) => formatDateWithDay(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'lateFinish',
    header: 'Late_Finish',
    cell: (info) => formatDateWithDay(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'actualStart',
    header: 'Actual_Start',
    cell: (info) =>
      info.getValue() === 'NA'
        ? 'NA'
        : formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'actualFinish',
    header: 'Actual_Finish',
    cell: (info) =>
      info.getValue() === 'NA'
        ? 'NA'
        : formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'percentC',
    header: 'Percent_C',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'percentW',
    header: 'Percent_W',
    cell: (info) => formatNumber(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: (info) => formatDuration(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'calendar',
    header: 'Calendar_',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'totalFloat',
    header: 'Total_Float',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'uniqueId2',
    header: 'Unique_ID',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'uniqueId3',
    header: 'Unique_ID',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'constraint',
    header: 'Constraint',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'sowPara',
    header: 'SOW_Para',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'rccRtr',
    header: 'RCC_RTR',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'summary',
    header: 'Summary',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
];

// Mock data based on the image
export const mockMspData: MspItem[] = [
  {
    id: '1',
    workItem: '0',
    uniqueId: '',
    taskName: 'USS GRAVELY (DDG 107) FY26 SRA',
    icn: '',
    keyEventMilestoneSystem: '',
    componentLocation: '',
    executing: 'ECRF',
    superinten: '',
    baselineS: '2024-01-12',
    baselineF: '2024-10-15',
    startDate: '2024-01-12',
    finishDate: '2024-10-19',
    earlyStart: '2024-01-12',
    earlyFinish: '2024-10-15',
    lateStart: '2024-01-12',
    lateFinish: '2024-10-19',
    actualStart: 'NA',
    actualFinish: 'NA',
    percentC: '0',
    percentW: '0',
    duration: '192.8',
    calendar: '',
    totalFloat: '0d',
    uniqueId2: '',
    uniqueId3: '',
    constraint: 'As Soon As Possible',
    sowPara: '',
    rccRtr: '',
    summary: 'Yes',
  },
];
