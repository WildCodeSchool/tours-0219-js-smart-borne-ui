import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data } from '../../shared/models/data.model';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  configUrl = `${environment.apiUrl}/datas`;

  constructor(private http: HttpClient) { }

  public getAllDataByDay(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.configUrl}/days`);
  }

  public getAllDataByWeek(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.configUrl}/weeks`);
  }

  public getAllDataByMonth(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.configUrl}/months`);
  }

  public getDataByDay(id: string): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.configUrl}/${id}/days`);
  }

  public getDataByWeek(id: string): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.configUrl}/${id}/weeks`);
  }

  public getDataByMonth(id: string): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.configUrl}/${id}/months`);
  }
}
