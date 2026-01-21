import { HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { RccApplicabilityLog, RccApplicabilityLogResponse } from './rcc-applicability-log.model';

@Injectable({
    providedIn: 'root',
})
export class RccApplicabilityLogService {
    http = inject(HttpService);

    // name of the controller used in the backend
    authController = signal<string>('auth/');

    rccApplicabilityLogController = signal<string>('RccApplicabilityLog');
    getRccApplicabilityLogURL = signal<string>(
        this.rccApplicabilityLogController()
    );
    addRccApplicabilityLogURL = signal<string>(
        this.rccApplicabilityLogController()
    );
    deleteRccApplicabilityLogURL = signal<string>(
        this.rccApplicabilityLogController()
    );

    /**
     * Get Rcc Applicability Log List
     * @returns Observable with Rcc Applicability Log List response
     */
    getRccApplicabilityLog(): Observable<RccApplicabilityLogResponse> {
        return this.http.getDataFromServer(this.getRccApplicabilityLogURL());
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
            this.deleteRccApplicabilityLogURL() + '/' + id
        );
    }
}
