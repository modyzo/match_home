import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getRequest(endpoint: string): Observable<Object> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(`${environment.whiseApi}/${endpoint}`, {
      headers,
    });
  }

  public postRequest(endpoint: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(`${environment.whiseApi}/${endpoint}`, data, {
      headers,
    });
  }

  public getList() {
    console.log('propal');
    return this.postRequest('v1/estates/list', {});
  }
}
