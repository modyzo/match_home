import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { StorageService } from '@app/shared/services/storage.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class TokenizerService implements OnInit {
  ngOnInit(): void {}

  constructor(private http: HttpClient, private storageService: StorageService) {}

  getToken(): Observable<any> {
    return this.storageService.getItem('token');
  }

}
