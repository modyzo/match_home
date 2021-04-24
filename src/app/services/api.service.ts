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

  public patchRequest(endpoint: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch(`${environment.apiUrl}/${endpoint}`, data, {
      headers,
    });
  }

  public deleteRequest(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete(`${environment.apiUrl}/${endpoint}`, {
      headers,
    });
  }
  public patchFormDataRequest(endpoint: string, data: any): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/${endpoint}`, data);
  }

  public getClientData(clientId: number) {
    return this.postRequest('v1/admin/clients/settings', { clientId });
  }

  public createClient(clientData) {
    return this.postRequest('v1/contacts/create', clientData);
  }

  public getProfile() {
    return this.getRequest('profile');
  }

  public updateProfile(data: any) {
    return this.patchRequest('profile', data);
  }

  public updatePhoto(formData: FormData) {
    return this.patchFormDataRequest('profile/upload/avatar', formData);
  }

  public downloadImage(url: string): Observable<Blob> {
    return this.httpClient.get(url, {
      responseType: 'blob',
    });
  }

  public getProperties(data: any) {
    return this.postRequest(`properties`, data);
  }

  public getMyProperties() {
    return this.getRequest('properties/my');
  }

  public removeProperties(id: string) {
    return this.deleteRequest(`properties/${id}`);
  }

  public getPropertiesDetails(id: string) {
    return this.getRequest(`properties/${id}`);
  }

  public createProperties(data: any) {
    return this.postRequest(`properties/create`, data);
  }

  public updateProperties(data: any, id: string) {
    return this.patchRequest(`properties/${id}`, data);
  }

  public updatePropertiesPhoto(formData: FormData, id: string) {
    return this.patchFormDataRequest(
      `properties/${id}/upload/pictures`,
      formData
    );
  }

  public removePictures(id: string, picturesId: string) {
    return this.patchRequest(
      `properties/${id}/remove/pictures/${picturesId}`,
      {}
    );
  }

  public addReaction(id: string, reaction: string) {
    return this.patchRequest(`properties/reactions/${id}/${reaction}`, {});
  }

  public requestPropertyInfo(id: string, type: string) {
    return this.patchRequest(`properties/reactions/${id}/request/${type}`, {});
  }

  public getActivities() {
    return this.getRequest('activities');
  }

  public getActivitiesByType(type: string) {
    return this.getRequest(`activities/type/${type}`);
  }

  public getChats() {
    return this.getRequest(`chats`);
  }

  public getBoosts() {
    return this.getRequest('boosts');
  }

  public getBoostsById(id: string) {
    return this.getRequest(`boosts/${id}`);
  }

  public patcBoost(id: string) {
    return this.patchRequest(`boosts/${id}/buy`, { id });
  }
}
