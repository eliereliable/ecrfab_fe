import { ColumnDef } from '@tanstack/angular-table';

export interface ImportFiles {
    CategoryId: number;
    File: File;
    ProjectId: string;
    FileDate: Date;
}

export interface ImportFilesResponse {
    page: number;
    size: number;
    total: number;
    items: Files[];
}

export interface Files {
    id: number;
    category_id: number;
    file_date: Date;
    file_name: string;
    imported_at: Date;
    imported_by: number;
    is_deleted: boolean;
    is_failed_import: boolean;
    project_id: string;
}

export interface Categories {
    id: number;
    category_Name: string;
    is_Deleted: boolean;
    file_Extension: string | null;
}

// Helper function to format date values
const formatDate = (value: Date | string | null | undefined): string => {
    if (!value) return '-';
    const date = new Date(value);
    return isNaN(date.getTime()) ? '-' : date.toLocaleDateString();
};

// Helper function to format boolean values
const formatBoolean = (value: boolean | null | undefined): string => {
    if (value === null || value === undefined) return '-';
    return value ? 'Yes' : 'No';
};

export const importFilesColumns: ColumnDef<Files>[] = [
    {
        accessorKey: 'file_name',
        header: 'File Name',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'category_id',
        header: 'Category ID',
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
        accessorKey: 'file_date',
        header: 'File Date',
        cell: (info) => formatDate(info.getValue() as Date),
        enableSorting: true,
    },
    {
        accessorKey: 'imported_by',
        header: 'Imported By',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'imported_at',
        header: 'Imported At',
        cell: (info) => formatDate(info.getValue() as Date),
        enableSorting: true,
    },
    {
        accessorKey: 'is_failed_import',
        header: 'Failed',
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