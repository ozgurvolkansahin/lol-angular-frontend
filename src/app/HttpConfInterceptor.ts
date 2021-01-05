import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class HttpConfInterceptor implements HttpInterceptor {
  constructor(private authService: NbAuthService,
    private router: Router,
    private toastrService: NbToastrService) { }
    request: any;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Authorization')) {
      this.authService.getToken().subscribe(result => {
        const token = result.getValue();
        if (token) {
          request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
        }
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
    this.request = request;

    return next.handle(request).pipe(
      map((event: any) => {
        if (event instanceof HttpResponse) {
          // close toggle, you got response
          if (event.status === 401) {
            this.router.navigate['/auth/login'];
          }
        }
        return event;
      }), catchError((err) => {
        // you catch the http error, you can return error name
        this.toastrService.danger(err.statusText);
        return throwError(err);
      }),
    );  }
}
