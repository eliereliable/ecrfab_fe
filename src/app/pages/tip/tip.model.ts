import { ColumnDef } from '@tanstack/angular-table';

export interface TipItem {
  id?: string;
  itemNo: string;
  shopSub: string;
  task: string;
  title: string;
  itemLocation: string;
  workPara: string;
  standardItem: string;
  para: string;
  inspectionType: string;
  keyEvents: string;
  partialFinal: string;
  satUnsat: string;
  notifiedCustomerGovernmentRep: string;
  notifyDateTime: Date | string | null;
  checkpointDateTime: Date | string | null;
  completedDateTime: Date | string | null;
  ticketNo: string;
  addedToNmd: string;
  criteria: string;
  remarks: string;
}

// Helper function to format dates and times
const formatDateTime = (value: Date | string | null): string => {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (isNaN(date.getTime())) return '-';
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const tipColumns: ColumnDef<TipItem>[] = [
  {
    accessorKey: 'itemNo',
    header: 'Item No',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'shopSub',
    header: 'Shop/Sub',
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
    accessorKey: 'title',
    header: 'Title',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'itemLocation',
    header: 'Item Location',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'workPara',
    header: 'Work Para',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'standardItem',
    header: 'Standard Item',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'para',
    header: 'Para',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'inspectionType',
    header: 'Inspection Type',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'keyEvents',
    header: 'Key Events',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'partialFinal',
    header: 'Partial / Final',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'satUnsat',
    header: 'Sat / Unsat',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'notifiedCustomerGovernmentRep',
    header: 'Notified Customer / Government Rep',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'notifyDateTime',
    header: 'Notify Date / Time',
    cell: (info) => formatDateTime(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'checkpointDateTime',
    header: 'Checkpoint Date / Time',
    cell: (info) => formatDateTime(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'completedDateTime',
    header: 'Completed Date / Time',
    cell: (info) => formatDateTime(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'ticketNo',
    header: 'Ticket No.',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'addedToNmd',
    header: 'Added To NMD',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'criteria',
    header: 'Criteria',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
];

// Mock data based on the image
export const mockTipData: TipItem[] = [
  {
    id: '1',
    itemNo: '042-37-001',
    shopSub: 'DIV 8',
    task: '003',
    title:
      'General Requirements for Work Within Naval Station Norfolk; accomplish',
    itemLocation: 'NOB',
    workPara: '3.4',
    standardItem: '009-009',
    para: '3.2',
    inspectionType: '(G) (V)',
    keyEvents: 'WC',
    partialFinal: '',
    satUnsat: '',
    notifiedCustomerGovernmentRep: '',
    notifyDateTime: null,
    checkpointDateTime: null,
    completedDateTime: null,
    ticketNo: '1',
    addedToNmd: 'No',
    criteria: '',
    remarks:
      'Provide notification to the SUPERVISOR when ready to start the PCP.',
  },
];
