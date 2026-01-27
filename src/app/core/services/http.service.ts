import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface HTTPResponse {
  code: number;
  message: string;
  status: string | 'SUCCESS' | 'FAILURE';
  data: Record<string, any[]>;
}
/**
 * Service for making HTTP requests to the backend API, including GET, POST, PUT, and DELETE operations.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);
  // API base URL from environment
  apiUrl = signal<string>(environment.serverApiBe);

  /**
   * Sends a POST request to the server with form data.
   * @param action The API endpoint action.
   * @param formData The data to be sent in the body of the request.
   * @returns Observable<any> - The server response.
   */
  postDataToServer(action: string, formData: any) {
    return this.http
      .post(this.apiUrl() + action, formData, { withCredentials: true })
      .pipe(map((response: any) => response));
  }

  /**
   * Sends a POST request to the server with multipart form data.
   * @param action The API endpoint action.
   * @param formData The data to be sent in the body of the request.
   * @returns Observable<any> - The server response.
   */
  postFormToServerMultiPart(action: string, formData: any) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });

    return this.http
      .post(this.apiUrl() + action, formData, { headers, withCredentials: true })
      .pipe(map((response: any) => response));
  }

  /**
   * Sends a PUT request to the server with multipart form data.
   * @param action The API endpoint action.
   * @param formData The data to be sent in the body of the request.
   * @returns Observable<any> - The server response.
   */
  putFormToServerMultiPart(action: string, formData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });

    return this.http
      .put(this.apiUrl() + action, formData, { headers, withCredentials: true })
      .pipe(map((response: any) => response));
  }

  /**
   * Sends a GET request to the server.
   * @param action The API endpoint action.
   * @returns Observable<any> - The server response.
   */
  getDataFromServer(action: string) {
    return this.http
      .get(this.apiUrl() + action, {
        withCredentials: true
      })
      .pipe(map((response: any) => response));
  }

  /**
   * Sends a GET request to a full URL (used for SSO or external endpoints).
   * @param fullUrl The complete URL including the base path.
   * @returns Observable<any> - The server response.
   */
  getDataFromFullUrl(fullUrl: string) {
    return this.http
      .get(fullUrl, {
        withCredentials: true
      })
      .pipe(map((response: any) => response));
  }

  /**
   * Sends a GET request to the server and returns a Blob.
   * @param action The API endpoint action.
   * @returns Observable<Blob> - The server response.
   */
  getDataFromServerBlob(action: string) {
    return this.http
      .get(this.apiUrl() + action, { responseType: 'blob' })
      .pipe(map((response: any) => response));
  }

  /**
   * Sends a PUT request to the server with form data.
   * @param action The API endpoint action.
   * @param formData The data to be sent in the body of the request.
   * @returns Observable<any> - The server response.
   */
  updateDataInServer(action: string, formData: any) {
    return this.http
      .put(this.apiUrl() + action, formData, { withCredentials: true })
      .pipe(map((response: any) => response));
  }

  /**
   * Sends a PATCH request to the server.
   * PATCH allows updating specific fields or parts of a resource without altering the rest
   * @param action The API endpoint action.
   * @param formData The data to be sent in the body of the request.
   * @returns Observable<any> - The server response.
   */
  patchDataInServer(action: string, formData: any) {
    return this.http
      .patch(this.apiUrl() + action, formData, { withCredentials: true })
      .pipe(map((response: any) => response));
  }

  /**
   * Sends a DELETE request to the server.
   * @param action The API endpoint action.
   * @returns Observable<any> - The server response.
   */
  deleteDataFromServer(action: string) {
    return this.http
      .delete(this.apiUrl() + action, { withCredentials: true })
      .pipe(map((response: any) => response));
  }
}
