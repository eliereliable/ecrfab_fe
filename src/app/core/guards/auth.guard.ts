import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SecurityService } from '../services/security.service';

/**
 * AuthGuard Service
 * Protects routes by checking if the user is authenticated.
 * SSR-safe: Only checks authentication in browser environment.
 * Note: Use with AuthResolver to ensure data is loaded before this guard runs.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private securityService = inject(SecurityService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Checks if the user is authenticated by verifying user data exists.
   * @returns {boolean} - `true` if authenticated, `false` and redirects if not.
   */
  canActivate(): boolean {
    // On server-side, allow navigation (will be re-evaluated on client)
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    const isAuthenticated = this.securityService.isAuthenticated();
    const userId = this.securityService.userId();

    if (isAuthenticated && userId) {
      return true;
    } else {
      // Redirect to landing page if not authenticated
      this.router.navigate(['/']);
      return false;
    }
  }
}
