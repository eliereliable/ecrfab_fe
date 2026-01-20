import { HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { Projects, ProjectsParams, ProjectsResponse } from './projects.model';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    http = inject(HttpService);

    projectsController = signal<string>('Projects/');
    getProjectsURL = signal<string>(
        this.projectsController() + 'GetProject'
    );
    addProjectsURL = signal<string>(
        this.projectsController() + 'ManageProject'
    );
    deleteProjectsURL = signal<string>(
        this.projectsController() + 'DeleteProject'
    );
    /**
     * Get projects
     * @param params Projects parameters
     * @returns Observable with projects response
     */
    getProjects(params: ProjectsParams): Observable<ProjectsResponse> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('id', params.id || '');
        httpParams = httpParams.set('project_name', params.project_name || '');
        httpParams = httpParams.set('PageNumber', params.PageNumber.toString());
        httpParams = httpParams.set('PageSize', params.PageSize.toString());
        httpParams = httpParams.set('Sorting', params.Sorting || '');
        return this.http.getDataFromServer(this.getProjectsURL() + '?' + httpParams.toString());
    }

    /**
     * Add projects
     * @param item Projects to add
     * @returns Observable with projects response
     */
    addProjects(item: Projects): Observable<ProjectsResponse> {
        return this.http.postDataToServer(this.addProjectsURL(), item);
    }

    /**
     * Delete projects
     * @param id ID of the project to delete
     * @returns Observable with projects response
     */
    deleteProjects(id: string): Observable<any> {
        return this.http.deleteDataFromServer(this.deleteProjectsURL() + '/' + id);
    }
}
