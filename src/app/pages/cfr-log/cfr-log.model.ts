import { ColumnDef } from '@tanstack/angular-table';

export interface CfrLogItem {
  id?: string;
  cr: string;
  specItem: string;
  createdDate: Date | string | null;
  submittedDate: Date | string | null;
  totalDaysFromCreatedAndSubmitted: number | string | null;
  totalDaysFromSubmittedAndSettled: number | string | null;
  title: string;
  answerDate: Date | string | null;
  daysExpendedAwaitingAnswer: number | string | null;
  isSequenceRequired: string;
  isRequiredReport: string;
  followOnReportRequired: string;
  tipImpact: string;
  subcontractor: string;
  subcontractorReportNumber: string;
  answerSubmittedToSubcontractor: string;
  reportCategory: string;
  rccNumber: string;
  dateRccIssuedForPricing: Date | string | null;
  dateRccSubmittedToCustomer: Date | string | null;
  dateRccSettled: Date | string | null;
  dateRccReleasedForWork: Date | string | null;
  totalDaysFromCfrAnswerToReleaseForWork: number | string | null;
  totalDaysFromCfrSubmittalToReleaseForWork: number | string | null;
  daysPricingOutstandingSettledToRelease: number | string | null;
  customerCfrNumber: string;
  governmentResponse: string;
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

// Helper function to format numbers or return N/A
const formatNumberOrNA = (value: number | string | null): string => {
  if (value === null || value === undefined || value === '') return 'N/A';
  if (typeof value === 'string' && value.toUpperCase() === 'N/A') return 'N/A';
  return String(value);
};

export const cfrLogColumns: ColumnDef<CfrLogItem>[] = [
  {
    accessorKey: 'cr',
    header: 'C/R',
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
    accessorKey: 'createdDate',
    header: 'Created Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'submittedDate',
    header: 'Submitted Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'totalDaysFromCreatedAndSubmitted',
    header: 'Total Days From Date Created And Submitted',
    cell: (info) => formatNumberOrNA(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'totalDaysFromSubmittedAndSettled',
    header: 'Total Days From Date Submitted And Date Settled',
    cell: (info) => formatNumberOrNA(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'answerDate',
    header: 'Answer Date',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'daysExpendedAwaitingAnswer',
    header: 'Days Expended Awaiting Answer',
    cell: (info) => formatNumberOrNA(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'isSequenceRequired',
    header: 'Is Sequence Required?',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'isRequiredReport',
    header: 'Is Required Report?',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'followOnReportRequired',
    header: 'Follow On Report Required?',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'tipImpact',
    header: 'TIP Impact?',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'subcontractor',
    header: 'Subcontractor',
    cell: (info) => formatNumberOrNA(info.getValue() as string),
    enableSorting: true,
  },
  {
    accessorKey: 'subcontractorReportNumber',
    header: 'Subcontractor Report Number',
    cell: (info) => formatNumberOrNA(info.getValue() as string),
    enableSorting: true,
  },
  {
    accessorKey: 'answerSubmittedToSubcontractor',
    header: 'Answer Submitted to Subcontractor',
    cell: (info) => formatNumberOrNA(info.getValue() as string),
    enableSorting: true,
  },
  {
    accessorKey: 'reportCategory',
    header: 'Report Category',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'rccNumber',
    header: 'RCC Number',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'dateRccIssuedForPricing',
    header: 'Date RCC Issued For Pricing',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'dateRccSubmittedToCustomer',
    header: 'Date RCC Submitted To Customer',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'dateRccSettled',
    header: 'Date RCC Settled',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'dateRccReleasedForWork',
    header: 'Date RCC Released For Work',
    cell: (info) => formatDate(info.getValue() as Date | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'totalDaysFromCfrAnswerToReleaseForWork',
    header: 'Total Days From CFR Answer To Release For Work',
    cell: (info) => formatNumberOrNA(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'totalDaysFromCfrSubmittalToReleaseForWork',
    header: 'Total Days From CFR Submittal To Release For Work',
    cell: (info) => formatNumberOrNA(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'daysPricingOutstandingSettledToRelease',
    header: 'Days Pricing Outstanding Settled To Release',
    cell: (info) => formatNumberOrNA(info.getValue() as number | string | null),
    enableSorting: true,
  },
  {
    accessorKey: 'customerCfrNumber',
    header: 'Customer CFR Number',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'governmentResponse',
    header: 'Government Response',
    cell: (info) => info.getValue() || '-',
    enableSorting: true,
  },
];

// Mock data based on the image
export const mockCfrLogData: CfrLogItem[] = [
  {
    id: '1',
    cr: '001',
    specItem: '123-11-002 (E1)',
    createdDate: '2025-11-28',
    submittedDate: '2025-12-04',
    totalDaysFromCreatedAndSubmitted: 6,
    totalDaysFromSubmittedAndSettled: 'N/A',
    title: 'Added Tank NMD Rpt 01',
    answerDate: null,
    daysExpendedAwaitingAnswer: null,
    isSequenceRequired: 'Yes',
    isRequiredReport: 'No',
    followOnReportRequired: 'No',
    tipImpact: 'Yes',
    subcontractor: 'N/A',
    subcontractorReportNumber: 'N/A',
    answerSubmittedToSubcontractor: 'N/A',
    reportCategory: 'Immediate',
    rccNumber: 'RCC 1G',
    dateRccIssuedForPricing: '2025-12-08',
    dateRccSubmittedToCustomer: null,
    dateRccSettled: null,
    dateRccReleasedForWork: null,
    totalDaysFromCfrAnswerToReleaseForWork: null,
    totalDaysFromCfrSubmittalToReleaseForWork: null,
    daysPricingOutstandingSettledToRelease: null,
    customerCfrNumber: '',
    governmentResponse: '',
  },
];

