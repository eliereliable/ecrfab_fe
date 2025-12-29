import { ColumnDef } from '@tanstack/angular-table';

export interface UssGravelyRequiredReportLogItem {
  id?: string;
  reportNumber: number;
  nsiFy: string;
  ssp: string;
  vesselNameAndHull: string;
  contract: string;
  ecrJobOrder: string;
  ecrItem: string;
  rcc: string;
  title: string;
  navyItemNumber: string;
  workPara: string;
  stdItem: string;
  stdItemPara: string;
  inspectionDescriptionAcceptCriteria: string;
  remarks: string;
  rptDueDate: Date | string | null;
  submitDate: Date | string | null;
  answeredDate: Date | string | null;
  cfrNmdNumber: string;
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

export const ussGravelyRequiredReportLogColumns: ColumnDef<UssGravelyRequiredReportLogItem>[] =
  [
    {
      accessorKey: 'reportNumber',
      header: 'Report #',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
    {
      accessorKey: 'nsiFy',
      header: 'NSI FY',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
    {
      accessorKey: 'ssp',
      header: 'SSP',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
    {
      accessorKey: 'vesselNameAndHull',
      header: 'Vessel Name and Hull',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
    {
      accessorKey: 'contract',
      header: 'Contract',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
    {
      accessorKey: 'ecrJobOrder',
      header: 'ECR Job Order',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
    {
      accessorKey: 'ecrItem',
      header: 'ECR Item',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
    {
      accessorKey: 'rcc',
      header: 'RCC',
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
      accessorKey: 'navyItemNumber',
      header: 'Navy Item Number',
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
      accessorKey: 'stdItem',
      header: 'STD Item',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
    {
      accessorKey: 'stdItemPara',
      header: 'STD Item Para',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
    {
      accessorKey: 'inspectionDescriptionAcceptCriteria',
      header: 'Inspection Description / Accept Criteria',
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
      accessorKey: 'rptDueDate',
      header: 'RPT DUE DATE',
      cell: (info) => formatDate(info.getValue() as Date | string | null),
      enableSorting: true,
    },
    {
      accessorKey: 'submitDate',
      header: 'Submit Date',
      cell: (info) => formatDate(info.getValue() as Date | string | null),
      enableSorting: true,
    },
    {
      accessorKey: 'answeredDate',
      header: 'Answered Date',
      cell: (info) => formatDate(info.getValue() as Date | string | null),
      enableSorting: true,
    },
    {
      accessorKey: 'cfrNmdNumber',
      header: 'CFR # NMD #',
      cell: (info) => info.getValue() || '-',
      enableSorting: true,
    },
  ];

// Mock data based on the image
export const mockUssGravelyRequiredReportLogData: UssGravelyRequiredReportLogItem[] =
  [
    {
      id: '1',
      reportNumber: 1,
      nsiFy: 'FY-26',
      ssp: 'SRA',
      vesselNameAndHull: 'USS GRAVELY (DDG-107)',
      contract: 'N0002422D402',
      ecrJobOrder: '103576',
      ecrItem: '',
      rcc: '',
      title: 'Administrative Purposes; accomplish',
      navyItemNumber: '000-00-000',
      workPara: '3.1',
      stdItem: '009-001',
      stdItemPara: '3.2.4-3.2.4.2',
      inspectionDescriptionAcceptCriteria:
        'GFM Log, GFI, Overdue CFRs Submit one legible copy, in approved transferrable media, of the following to the SUPERVISOR one day prior to the weekly progress meeting: See 009-001 for requirements',
      remarks: '',
      rptDueDate: null,
      submitDate: null,
      answeredDate: null,
      cfrNmdNumber: '',
    },
  ];
