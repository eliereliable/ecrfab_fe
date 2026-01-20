import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { HttpParams } from '@angular/common/http';
import { Categories, ImportFiles, ImportFilesResponse } from './import-files.model';

@Injectable({
    providedIn: 'root',
})
export class ImportFilesService {
    http = inject(HttpService);

    importFilesController = signal<string>('ImportFiles/');
    getImportFilesURL = signal<string>(
        this.importFilesController()
    );
    addImportFilesURL = signal<string>(
        this.importFilesController() + 'run'
    );
    deleteImportFilesURL = signal<string>(
        this.importFilesController()
    );
    categoriesURL = signal<string>(this.importFilesController() + 'categories');

    /**
     * Get categories
     * @returns Observable with categories response
     */
    getCategories(): Observable<Categories[]> {
        return this.http.getDataFromServer(this.categoriesURL());
    }

    /**
     * Add import files
     * @param item Import files to run
     * @returns Observable with import files response
     */
    runImportFiles(item: ImportFiles): Observable<any> {
        const formData = new FormData();
        formData.append('CategoryId', item.CategoryId.toString());
        formData.append('File', item.File);
        formData.append('ProjectId', item.ProjectId);
        formData.append('FileDate', item.FileDate.toISOString());
        return this.http.postFormToServerMultiPart(this.addImportFilesURL(), formData);
    }

    /**
     * Get import files
     * @param page Page number
     * @param size Page size
     * @returns Observable with import files response
     */
    getImportFiles(page: number, size: number): Observable<ImportFilesResponse> {
        return this.http.getDataFromServer(this.getImportFilesURL() + '?page=' + page + '&size=' + size);
    }

    /**
     * Delete import files
     * @param id ID of the import file to delete
     * @returns Observable with import files response
     */
    deleteImportFiles(id: number): Observable<any> {
        return this.http.deleteDataFromServer(this.deleteImportFilesURL() + '/' + id);
    }
}
