import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('assets')) {
      return next.handle(req);
    }
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<unknown>): void => {
          /* if (event instanceof HttpResponse)
            console.log('Server response', event); */
        },
        (err): void => {
          if (err instanceof HttpErrorResponse) {
            /* console.log('error', err.message); */
          }
        }
      ),
    );
  }
}

/* @Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.store.dispatch(signOut());
          return EMPTY;
        }

        const { error } = err;
        const errorMessage: string = error?.message ?? 'Something went wrong';
        this.store.dispatch(setErrorMessage({ message: errorMessage }));
        return EMPTY;
      })
    );
  }

  constructor(private store: Store) {}
} */
