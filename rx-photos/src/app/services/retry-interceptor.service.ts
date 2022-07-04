import {Injectable} from '@angular/core';
import {delay, flatMap, Observable, of, retryWhen, throwError} from 'rxjs';
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
export class RetryInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retryWhen(err$ =>
          err$
            .pipe(
              flatMap(err => {
                if (err instanceof HttpErrorResponse
                  && err.status < 600 && err.status > 499) {
                  return of(null)
                    .pipe(delay(500));
                }
                return throwError(err);
              }))
        ));
  }
}
