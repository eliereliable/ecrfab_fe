import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpService);

  // name of the controller used in the backend
  authController = signal<string>('Auth/');
  userRequest = signal<string>(environment.serverApiSSO + this.authController() + 'user');
  logoutRequest = signal<string>(environment.serverApiSSO + this.authController() + 'logout');

  /**
   * Get signed in user
   * @returns Observable with signed in user response
   */
  getUser(): Observable<UserResponse> {
    return this.http.getDataFromFullUrl(this.userRequest());
  }

  /**
   * Log out the user
   */
  logout(): void {
    window.location.href = this.logoutRequest();
  }
}
