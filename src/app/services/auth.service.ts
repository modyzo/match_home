import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@app/shared/services/storage.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthService {
  constructor(
    private myRoute: Router,
    private apiService: ApiService,
    private storageService: StorageService,
  ) {}

  sendToken(token: string) {
    this.storageService.setItem('token', token);
  }

  getToken() {
    return this.storageService.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    this.storageService.removeItem('token');
    this.myRoute.navigate(['/login']);
  }

  public refreshToken(): Observable<any> {
    return this.storageService.getItem('token').pipe(
      mergeMap((token) => {
        console.log('token refreshing', token);
        return this.refreshTokenRequest(token || '');
      }),
      mergeMap((res: any) => {
        return forkJoin([
          from(of(res.token)),
          from(of(this.storageService.setItem('token', res.token))),
        ]);
      }),
      map((result) => {
        return result[0];
      })
    );
  }

  public signIn(body: any): Observable<any> {
    return this.apiService.postRequest('sign-in', body);
  }

  public verifyAccount(body: any): Observable<any> {
    return this.apiService.postRequest('sign-up/confirm', {token: body});
  }

  public refreshTokenRequest(token: any): Observable<any> {
    return this.apiService.postRequest('token/refresh', { token });
  }

  public signUp(body: any): Observable<any> {
    return this.apiService.postRequest('sign-up', body);
  }
}
