import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { UserResponse } from '../models/auth.model';

/**
 * Service for managing authentication state, tokens, and user data
 */
@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private localStorageService = inject(LocalStorageService);
  private authService = inject(AuthService);

  // Storage keys
  private readonly USER_ID_KEY = 'userId';
  private readonly USER_NAME_KEY = 'userName';
  private readonly EMAIL_KEY = 'email';
  private readonly IS_AUTHENTICATED_KEY = 'isAuthenticated';

  // Reactive state
  private _userId = signal<string | null>(null);
  private _userName = signal<string | null>(null);
  private _email = signal<string | null>(null);
  private _isAuthenticated = signal<boolean>(false);

  // Public getters
  get userId() {
    return this._userId.asReadonly();
  }

  get userName() {
    return this._userName.asReadonly();
  }

  get email() {
    return this._email.asReadonly();
  }

  get isAuthenticated() {
    return this._isAuthenticated.asReadonly();
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only initialize auth state in browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAuthState();
    }
  }

  /**
   * Initialize authentication state from localStorage
   */
  private initializeAuthState(): void {
    const userId = this.localStorageService.getItem<string>(this.USER_ID_KEY);
    const userName = this.localStorageService.getItem<string>(this.USER_NAME_KEY);
    const email = this.localStorageService.getItem<string>(this.EMAIL_KEY);
    const isAuthenticated = this.localStorageService.getItem<boolean>(this.IS_AUTHENTICATED_KEY);

    // Load additional auth data if available
    if (userId) {
      this._userId.set(userId);
    }
    if (userName) {
      this._userName.set(userName);
    }
    if (email) {
      this._email.set(email);
    }
    if (isAuthenticated !== null) {
      this._isAuthenticated.set(isAuthenticated);
    }
  }

  /**
   * Save user profile data from auth response
   * @param userResponse The user response data
   */
  saveUserProfile(userResponse: UserResponse): void {
    this.localStorageService.setItem(this.USER_ID_KEY, userResponse.userId);
    this.localStorageService.setItem(this.USER_NAME_KEY, userResponse.userName);
    this.localStorageService.setItem(this.EMAIL_KEY, userResponse.email);
    this.localStorageService.setItem(this.IS_AUTHENTICATED_KEY, userResponse.isAuthenticated);

    this._userId.set(userResponse.userId);
    this._userName.set(userResponse.userName);
    this._email.set(userResponse.email);
    this._isAuthenticated.set(userResponse.isAuthenticated);
  }

  /**
   * Logout user and clear all authentication data
   */
  logout(): void {
    this.localStorageService.removeItem(this.USER_ID_KEY);
    this.localStorageService.removeItem(this.USER_NAME_KEY);
    this.localStorageService.removeItem(this.EMAIL_KEY);
    this.localStorageService.removeItem(this.IS_AUTHENTICATED_KEY);

    this._userId.set(null);
    this._userName.set(null);
    this._email.set(null);
    this._isAuthenticated.set(false);

    this.authService.logout();
  }
}
