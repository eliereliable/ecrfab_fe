import { ColumnDef } from '@tanstack/angular-table';

export interface Projects {
    id?: string;
    project_name: string;
}

export interface ProjectsResponse {
    total_items: number;
    total_pages: number;
    items: Projects[];
}

export interface ProjectsParams {
    id: string;
    project_name: string;
    PageNumber: number;
    PageSize: number;
    Sorting: string;
}

export const projectsColumns: ColumnDef<Projects>[] = [
    {
        accessorKey: 'id',
        header: 'Project ID',
        cell: (info) => info.getValue() || '-',
        enableSorting: true,
    },
    {
        accessorKey: 'project_name',
        header: 'Project Name',
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