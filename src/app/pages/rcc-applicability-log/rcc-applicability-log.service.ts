import { HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { RccApplicabilityLog } from './rcc-applicability-log.model';

@Injectable({
    providedIn: 'root',
})
export class RccApplicabilityLogService {
    http = inject(HttpService);

    // name of the controller used in the backend
    authController = signal<string>('auth/');

    rccApplicabilityLogController = signal<string>('RccApplicabilityLog/');
    getRccApplicabilityLogURL = signal<string>(
        this.rccApplicabilityLogController() + 'GetRccApplicabilityLog'
    );
    addRccApplicabilityLogURL = signal<string>(
        this.rccApplicabilityLogController() + 'ManageRccApplicabilityLog'
    );
    deleteRccApplicabilityLogURL = signal<string>(
        this.rccApplicabilityLogController() + 'DeleteRccApplicabilityLog'
    );

    /**
     * Get Rcc Applicability Log List
     * @param colmn_header Optional column header to filter by
     * @returns Observable with Rcc Applicability Log List response
     */
    getERLGlossaryList(colmn_header?: string): Observable<[]> {
        let params = new HttpParams();
        if (colmn_header && colmn_header.trim()) {
            params = params.set('colmn_header', colmn_header.trim());
        }
        const url = params.toString()
            ? this.getRccApplicabilityLogURL() + '?' + params.toString()
            : this.getRccApplicabilityLogURL();
        return this.http.getDataFromServer(url);
    }

    /**
     * Add Rcc Applicability Log Item
     * @param item ERL Glossary Item to add
     * @returns Observable with Rcc Applicability Log Item response
     */
    addRccApplicabilityLogItem(item: RccApplicabilityLog): Observable<any> {
        return this.http.postDataToServer(this.addRccApplicabilityLogURL(), item);
    }

    /**
     * Delete Rcc Applicability Log Item
     * @param id ID of the Rcc Applicability Log Item to delete
     * @returns Observable with Rcc Applicability Log Item response
     */
    deleteRccApplicabilityLogItem(id: number): Observable<any> {
        return this.http.deleteDataFromServer(
            this.deleteRccApplicabilityLogURL() + '?id=' + id
        );
    }
}
