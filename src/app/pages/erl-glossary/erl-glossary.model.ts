import { ColumnDef } from '@tanstack/angular-table';

export interface ErlGlossaryItem {
  id?: string;
  keyEvent: string;
  oqeCategory: string;
  documentId: string;
  workItemNo: string;
  workItemPara: string;
  workItemTitle: string;
  title: string;
  governmentResponse: string;
  location: string;
  criteria: string;
  nsiNo: string;
  nsiPara: string;
  inspectionType: string;
  inspectionScope: string;
  inspectionResults: string;
  startDate: Date | string | null;
  submissionDate: Date | string | null;
  completionDate: Date | string | null;
  reportDueDate: Date | string | null;
  baselineStart: Date | string | null;
  baselineFinish: Date | string | null;
  durationDays: number | null;
  plannedPercentComplete: number | null;
  actualPercentComplete: number | null;
  system: string;
  remarks: string;
  repairActivity: string;
  cfrXref: string;
  status: string;
  oqeCertStatus: string;
}

// Helper function to format dates
const formatDate = (value: Date | string | null): string => {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to format percentages
const formatPercentage = (value: number | null): string => {
  if (value === null || value === undefined) return '-';
  return `${value}%`;
};

export const erlGlossaryColumns: ColumnDef<ErlGlossaryItem>[] = [
  {
    accessorKey: 'keyEvent',
    header: 'Key Event',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'oqeCategory',
    header: 'OQE Category',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'documentId',
    header: 'Document ID',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'workItemNo',
    header: 'Work Item No',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'workItemPara',
    header: 'Work Item Para',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'workItemTitle',
    header: 'Work Item Title',
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
    accessorKey: 'governmentResponse',
    header: 'Government Response',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'location',
    header: 'Location',
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
    accessorKey: 'nsiNo',
    header: 'NSI No',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'nsiPara',
    header: 'NSI Para',
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
    accessorKey: 'inspectionScope',
    header: 'Inspection Scope',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'inspectionResults',
    header: 'Inspection Results',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'submissionDate',
    header: 'Submission Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'completionDate',
    header: 'Completion Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'reportDueDate',
    header: 'Report Due Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'baselineStart',
    header: 'Baseline Start',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'baselineFinish',
    header: 'Baseline Finish',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'durationDays',
    header: 'Duration (Days)',
    cell: (info) => {
      const value = info.getValue() as number | null;
      return value !== null && value !== undefined ? value : '-';
    },
    enableSorting: true,
  },
  {
    accessorKey: 'plannedPercentComplete',
    header: 'Planned % Complete',
    cell: (info) => formatPercentage(info.getValue() as number | null),
    enableSorting: true,
  },
  {
    accessorKey: 'actualPercentComplete',
    header: 'Actual % Complete',
    cell: (info) => formatPercentage(info.getValue() as number | null),
    enableSorting: true,
  },
  {
    accessorKey: 'system',
    header: 'System',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
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
    accessorKey: 'cfrXref',
    header: 'CFR Xref',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'oqeCertStatus',
    header: 'OQE Cert Status',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
];

// Mock data for demonstration
export const mockErlGlossaryData: ErlGlossaryItem[] = [
  {
    id: '1',
    keyEvent: 'Milestone 1',
    oqeCategory: 'CFR',
    documentId: 'CFR-1',
    workItemNo: '001-01-001',
    workItemPara: '3.1.1',
    workItemTitle: 'Hull Structure Inspection',
    title: 'Initial Hull Survey Report',
    governmentResponse: 'Approved',
    location: 'Forward Section',
    criteria: 'Visual inspection per MIL-STD-1689',
    nsiNo: 'NSI-001',
    nsiPara: '2.1',
    inspectionType: 'Visual',
    inspectionScope: 'Final',
    inspectionResults: 'Sat',
    startDate: '2024-01-15',
    submissionDate: '2024-02-01',
    completionDate: '2024-02-15',
    reportDueDate: '2024-02-20',
    baselineStart: '2024-01-10',
    baselineFinish: '2024-02-10',
    durationDays: 31,
    plannedPercentComplete: 100,
    actualPercentComplete: 100,
    system: 'SYS-001',
    remarks: 'Completed ahead of schedule',
    repairActivity: 'N/A',
    cfrXref: 'CFR-001',
    status: 'Complete',
    oqeCertStatus: 'Submitted',
  },
  {
    id: '2',
    keyEvent: 'Milestone 2',
    oqeCategory: 'IPS',
    documentId: 'IPS-1',
    workItemNo: '002-01-001',
    workItemPara: '3.2.1',
    workItemTitle: 'Electrical Systems Test',
    title: 'Power Distribution Test Report',
    governmentResponse: 'Pending',
    location: 'Engine Room',
    criteria: 'Per NAVSEA specifications',
    nsiNo: 'NSI-002',
    nsiPara: '2.2',
    inspectionType: 'Functional',
    inspectionScope: 'Partial',
    inspectionResults: 'In Progress',
    startDate: '2024-02-01',
    submissionDate: null,
    completionDate: null,
    reportDueDate: '2024-03-15',
    baselineStart: '2024-02-01',
    baselineFinish: '2024-03-01',
    durationDays: 28,
    plannedPercentComplete: 75,
    actualPercentComplete: 60,
    system: 'SYS-002',
    remarks: 'Awaiting parts delivery',
    repairActivity: 'Cable replacement',
    cfrXref: 'CFR-002',
    status: 'In Progress',
    oqeCertStatus: 'Remaining',
  },
  {
    id: '3',
    keyEvent: 'Milestone 3',
    oqeCategory: 'RR',
    documentId: 'RR-1',
    workItemNo: '003-01-001',
    workItemPara: '3.3.1',
    workItemTitle: 'Propulsion System Overhaul',
    title: 'Main Engine Inspection Report',
    governmentResponse: 'Approved with Comments',
    location: 'Propulsion Space',
    criteria: 'OEM specifications',
    nsiNo: 'NSI-003',
    nsiPara: '2.3',
    inspectionType: 'NDT',
    inspectionScope: 'Final',
    inspectionResults: 'Sat',
    startDate: '2024-01-20',
    submissionDate: '2024-02-28',
    completionDate: '2024-03-01',
    reportDueDate: '2024-03-05',
    baselineStart: '2024-01-15',
    baselineFinish: '2024-02-28',
    durationDays: 45,
    plannedPercentComplete: 100,
    actualPercentComplete: 100,
    system: 'SYS-003',
    remarks: 'Minor discrepancies resolved',
    repairActivity: 'Bearing replacement',
    cfrXref: 'CFR-003',
    status: 'Complete',
    oqeCertStatus: 'Complete',
  },
  {
    id: '4',
    keyEvent: 'Milestone 4',
    oqeCategory: 'WAF',
    documentId: 'WAF-1',
    workItemNo: '000-00-000',
    workItemPara: 'Admin',
    workItemTitle: 'Administrative Work Item',
    title: 'Documentation Review',
    governmentResponse: 'N/A',
    location: 'Office',
    criteria: 'N/A',
    nsiNo: '',
    nsiPara: '',
    inspectionType: 'Review',
    inspectionScope: 'N/A',
    inspectionResults: 'N/A',
    startDate: '2024-03-01',
    submissionDate: null,
    completionDate: null,
    reportDueDate: '2024-04-01',
    baselineStart: '2024-03-01',
    baselineFinish: '2024-03-31',
    durationDays: 30,
    plannedPercentComplete: 50,
    actualPercentComplete: 25,
    system: '',
    remarks: 'Pending supervisor review',
    repairActivity: 'N/A',
    cfrXref: '',
    status: 'In Progress',
    oqeCertStatus: 'Remaining',
  },
  {
    id: '5',
    keyEvent: 'Milestone 5',
    oqeCategory: 'CFR',
    documentId: 'CFR-2',
    workItemNo: '001-02-001',
    workItemPara: '3.1.2',
    workItemTitle: 'Tank Inspection',
    title: 'Fuel Tank Integrity Test',
    governmentResponse: 'Under Review',
    location: 'Tank Spaces',
    criteria: 'ASTM E1444',
    nsiNo: 'NSI-004',
    nsiPara: '2.4',
    inspectionType: 'NDT',
    inspectionScope: 'Partial',
    inspectionResults: 'Unsat',
    startDate: '2024-02-15',
    submissionDate: '2024-03-10',
    completionDate: null,
    reportDueDate: '2024-03-20',
    baselineStart: '2024-02-10',
    baselineFinish: '2024-03-10',
    durationDays: 28,
    plannedPercentComplete: 100,
    actualPercentComplete: 85,
    system: 'SYS-004',
    remarks: 'Re-inspection required',
    repairActivity: 'Tank coating repair',
    cfrXref: 'CFR-004',
    status: 'On Hold',
    oqeCertStatus: 'Remaining',
  },
];

