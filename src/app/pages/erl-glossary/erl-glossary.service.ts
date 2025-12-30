import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ErlGlossaryService {
  http = inject(HttpService);

  // name of the controller used in the backend
  authController = signal<string>('auth/');

  userURL = signal<string>(this.authController() + 'user');

  /**
   * Get user
   * @returns Observable with user response
   */
  getUser(): Observable<any> {
    return this.http.getDataFromServer(
      this.userURL()
    );
  }
}
