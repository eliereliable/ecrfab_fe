import { ColumnDef } from '@tanstack/angular-table';

export interface RccApplicabilityLog {
    id?: string;
    project_id: string;
    rcc_num: string;
    spec_item: string;
    wi_para: string;
    action_cat: string;
    comments: string;
    cfr: string;
}

export interface RccApplicabilityLogResponse {
    key: {
        httpCode: number;
        messages: string[];
    };
    value: {
        items: RccApplicabilityLog[];
    };
}

export const rccApplicabilityLogColumns: ColumnDef<RccApplicabilityLog>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'project_id',
        header: 'Project ID',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'rcc_num',
        header: 'RCC Number',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'spec_item',
        header: 'Spec Item',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'wi_para',
        header: 'WI Para',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'action_cat',
        header: 'Action Category',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'comments',
        header: 'Comments',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'cfr',
        header: 'CFR',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: () => '', // Cell content will be handled by template
        enableSorting: false,
    },
];