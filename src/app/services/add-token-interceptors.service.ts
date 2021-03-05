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
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddTokenInterceptor implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    console.log(`AddTokenInterceptor - ${req.url}`);
    return this.storageService.getItem('token').pipe(
      mergeMap((token) => {
        let jsonReq: HttpRequest<any> = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next.handle(jsonReq);
      })
    )

  }
}
