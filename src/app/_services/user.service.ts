import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from './area';
const API_URL = 'http://mohamedcoshy2022-001-site1.itempurl.com/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  updateLaundry(dryClean: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(API_URL + 'DryClean/'+ dryClean.id,
    dryClean, httpOptions);
  }

  getLaundryById(laundryId: string):Observable<any> {
    return this.http.get(API_URL + 'DryClean/' + laundryId);
  }

  createLaundry(dryClean: any) :Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(API_URL + 'DryClean',
    dryClean, httpOptions);
  }
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'DryClean');
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(API_URL + 'Areas');
  }

  
  deleteById(lauadryId: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(API_URL + 'DryClean/' + lauadryId,
      httpOptions);
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
