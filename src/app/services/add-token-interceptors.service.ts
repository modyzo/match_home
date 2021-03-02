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

@Injectable({
  providedIn: 'root',
})
export class AddTokenInterceptor implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`AddTokenInterceptor - ${req.url}`);

    let jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageService.getItem('token')}`,
      },
    });

    return next.handle(jsonReq);
  }
}
