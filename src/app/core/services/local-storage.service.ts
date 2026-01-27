import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Service for managing localStorage operations with type safety and error handling
 * SSR-safe: Only accesses localStorage when running in the browser
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Checks if localStorage is available (browser environment)
   */
  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  /**
   * Sets an item in localStorage with error handling
   * @param key The key to store the value under
   * @param value The value to store (will be JSON stringified)
   */
  setItem(key: string, value: any): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Gets an item from localStorage with error handling
   * @param key The key to retrieve the value for
   * @returns The parsed value or null if not found or error occurs
   */
  getItem<T>(key: string): T | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  /**
   * Removes an item from localStorage
   * @param key The key to remove
   */
  removeItem(key: string): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  /**
   * Clears all items from localStorage
   */
  clear(): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Checks if a key exists in localStorage
   * @param key The key to check
   * @returns True if the key exists, false otherwise
   */
  hasItem(key: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    return localStorage.getItem(key) !== null;
  }
}
