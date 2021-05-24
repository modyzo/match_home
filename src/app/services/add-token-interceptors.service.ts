import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpHeaderResponse,
  HttpSentEvent,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { TokenizerService } from './tokenizer.service';
import { environment } from '@env/environment';

@Injectable()
export class HttpRequestsInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenSubject = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private tokenizerService: TokenizerService
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
    | any
  > {

    if(['sign-in', 'sign-up', 'token', 'token/refresh', 'sign-up/confirm', ].includes(request.url.split(`${environment.apiUrl}/`)[1])){
      return next.handle(request);
    }
    return this.tokenizerService.getToken().pipe(
      mergeMap((token) => {
        return next.handle(this.addTokenToRequest(request, token));
      }),
      catchError((thrown: any) => {
        if (thrown instanceof HttpErrorResponse) {
          switch (thrown.status) {
            case 400: {
              return throwError(thrown);
            }
            case 401: {
              return this.handle401Error(request, next);
            }
            case 403: {
              this.authService.logout();
              return throwError(thrown);
            }
            default: {
              return throwError(thrown);
            }
          }
        } else {
          return throwError(thrown);
        }
      })
    )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: string) => {
          this.isRefreshingToken = false;
          this.tokenSubject.next(token);
          return next.handle(this.addTokenToRequest(request, token));
        }),
        catchError(async (error: any) => {
          this.isRefreshingToken = false;

          this.authService.logout();
          return throwError(error);
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token: string) => {
          return next.handle(this.addTokenToRequest(request, token));
        })
      );
    }
  }

  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
