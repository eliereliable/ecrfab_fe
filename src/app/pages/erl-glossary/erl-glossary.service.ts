import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { ErlGlossaryItem } from './erl-glossary.model';

@Injectable({
  providedIn: 'root',
})
export class ErlGlossaryService {
  http = inject(HttpService);

  // name of the controller used in the backend
  authController = signal<string>('auth/');

  userURL = signal<string>(this.authController() + 'user');

  erlGlossaryController = signal<string>('ERLGlossary/');
  getERLGlossaryURL = signal<string>(
    this.erlGlossaryController() + 'GetERLGlossary'
  );
  addERLGlossaryURL = signal<string>(
    this.erlGlossaryController() + 'ManageERLGlossary'
  );
  deleteERLGlossaryURL = signal<string>(
    this.erlGlossaryController() + 'DeleteERLGlossary'
  );

  /**
   * Get user
   * @returns Observable with user response
   */
  getUser(): Observable<any> {
    return this.http.getDataFromServer(this.userURL());
  }

  /**
   * Get ERL Glossary List
   * @returns Observable with ERL Glossary List response
   */
  getERLGlossaryList(): Observable<[]> {
    return this.http.getDataFromServer(this.getERLGlossaryURL());
  }

  /**
   * Add ERL Glossary Item
   * @param item ERL Glossary Item to add
   * @returns Observable with ERL Glossary Item response
   */
  addERLGlossaryItem(item: ErlGlossaryItem): Observable<any> {
    return this.http.postDataToServer(this.addERLGlossaryURL(), item);
  }

  /**
   * Delete ERL Glossary Item
   * @param id ID of the ERL Glossary Item to delete
   * @returns Observable with ERL Glossary Item response
   */
  deleteERLGlossaryItem(id: number): Observable<any> {
    return this.http.deleteDataFromServer(this.deleteERLGlossaryURL() + '?id=' + id);
  }
}
