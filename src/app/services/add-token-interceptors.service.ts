import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@app/shared/services/storage.service';
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { TokenizerService } from './tokenizer.service';

@Injectable({
  providedIn: 'root',
})
export class AddTokenInterceptor implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private tokenizerService: TokenizerService
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(`AddTokenInterceptor - ${req.url}`);
    if (req.url.includes('token')) {
      return next.handle(req);
    }
    return this.storageService.getItem('token').pipe(
      mergeMap((token) => {
        let jsonReq: HttpRequest<any> = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(jsonReq);
        return next.handle(jsonReq);
      }),
      catchError(() => {
        return this.tokenizerService.getToken().pipe(
          mergeMap((token) => {
            this.storageService.setItem('token', token);
            let jsonReq: HttpRequest<any> = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('error', jsonReq);

            return next.handle(jsonReq);
          })
        );
      })
    );
  }
}
