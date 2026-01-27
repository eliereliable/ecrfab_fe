import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, catchError, map } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { AuthService } from '../services/auth.service';
import { UserResponse } from '../models/auth.model';

/**
 * AuthResolver
 * Fetches and stores auth data before route activation.
 * Ensures user data is available before guards run.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<UserResponse | null> {
  private router = inject(Router);
  private securityService = inject(SecurityService);
  private authService = inject(AuthService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  resolve(): Observable<UserResponse | null> {
    // On server-side, return null (will be re-evaluated on client)
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    const userId = this.securityService.userId();
    const userName = this.securityService.userName();
    const email = this.securityService.email();
    const isAuthenticated = this.securityService.isAuthenticated();

    // If user data already exists and is authenticated, no need to fetch again
    if (userId && userName && email && isAuthenticated) {
      return of({
        userId,
        userName,
        email,
        isAuthenticated,
      });
    }

    // Fetch auth data from API
    return this.authService.getUser().pipe(
      map((authResponse: UserResponse) => {
        // Save user profile data
        this.securityService.saveUserProfile(authResponse);
        return authResponse;
      }),
      catchError(() => {
        // If API call fails, redirect to landing page
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
