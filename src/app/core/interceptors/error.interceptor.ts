import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

/**
 * Error Interceptor
 * Handles HTTP errors globally, specifically handling 409 status codes
 * and displaying error messages via toast notifications.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Check if the error is a 409 Conflict status
      if (error.status === 409) {
        console.log(error.error);
        // Extract error message from the response
        const errorMessage = error.error?.message || 'An error occurred';
        
        // Display error message via toast
        toast.error(errorMessage);
      }
      
      // Re-throw the error so it can be handled by component error handlers if needed
      return throwError(() => error);
    })
  );
};
