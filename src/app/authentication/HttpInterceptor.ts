import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { OauthService } from './OauthService';
import { Injectable } from '@angular/core';
import configure from '../../../configure';

@Injectable()
export class TokenAuthHttpInterceptor implements HttpInterceptor {
  constructor() {}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add auth header
    const newRequest = req.clone({ setHeaders: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return next.handle(newRequest);
  }
}

@Injectable()
export class RequestTimeLogHttpInterceptor implements HttpInterceptor {
  constructor(private OauthService: OauthService) {}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap((event) => {
        // Do something
      }),
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          try {
            console.log(
              `HTTP error> status = ${error.status}`
            );
            console.log(`HTTP error> url = ${error.url}`);
            // unAuth
            if (error.status === 401) {
              console.log('Waiting for refresh token.');
              this.OauthService.getReFreshTokenData().subscribe((data) => {
                this.OauthService.setToken(
                  data.access_token,
                  data.refresh_token
                );
                console.log('Got refresh token from auth server.');
                console.log('Wating for reload.');
                setTimeout(() => {
                  window.location.href = './home';
                }, 5000);
              });
            }
            // Needs for redirect to auth server
            if (error.status === 400) {
              console.log('refresh token has been expired.');
              console.log('waiting for redirect !');
              setTimeout(() => {
                window.location.href = configure.authServerGetCode;
              }, 5000);
            }
          } catch (ex) {
            console.error('CustomJwtInterceptor> exception:');
            console.log(ex);
          }
        }
        return of(error);
      })
    );
  }
}
