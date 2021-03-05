import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class TokenizerService implements OnInit {
  ngOnInit(): void {}

  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${environment.whiseApi}/token`;
    return this.http
      .post(
        url,
        {
          Username: 'siwaxoh793@combcub.com', // move to firebase or to env
          Password: 'siwaxoh793@combcub.com', // move to firebase or to env
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => console.log('Data: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    console.error(err);
    return Observable.throw(errorMessage);
  }
}
