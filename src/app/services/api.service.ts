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
    return this.httpClient.get(`${environment.apiUrl}/${endpoint}`, {
      headers,
    });
  }

  public postRequest(endpoint: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(`${environment.apiUrl}/${endpoint}`, data, {
      headers,
    });
  }

  public getList(requestData) {
    return this.postRequest('v1/estates/list', requestData);
  }

  public getClientData(clientId: number) {
    return this.postRequest('v1/admin/clients/settings', { clientId });
  }

  public createClient(clientData) {
    return this.postRequest('v1/contacts/create', clientData);
  }

  ///https://api.whise.eu/v1/estates/usedcities/list
}
