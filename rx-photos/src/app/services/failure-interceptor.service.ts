import {Injectable} from '@angular/core';
import {delay, flatMap, Observable, of, retryWhen, tap, throwError} from 'rxjs';
import {
  HttpResponse,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FailureInterceptorService implements HttpInterceptor {

  constructor(private errorService : ErrorService) { // must create error service
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(() => {
      error: (err: any) => {
        if (err instanceof HttpErrorResponse) {
          let msg = `${err.status}: ${err.message}`;
          this.errorService.showError(msg);
        }
      }}))
  }
}
