import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Borne } from '../../shared/models/borne';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BorneService {

  configUrl = `${environment.apiUrl}/bornes`;

  constructor(private http: HttpClient) {
  }

  public getListBorne(): Observable<Borne[]> {
    /*const obs1: Observable<any> = this.http.get(`${this.configUrl}`);
    const treatment = (param: any) => {
      return param as Borne[];
    };
    return obs1.pipe(map(treatment));*/

    return this.http.get<Borne[]>(`${this.configUrl}`);
  }

  public getBorneById(id: string): Observable<Borne> {
  //  const obs1: Observable<any> = this.http.get(`${this.configUrl}/${id}`);
  //  const treatment = (param: any) => {
  //    return param as Borne;
  //  };
  //  return obs1.pipe(map(treatment));
    return this.http.get<Borne>(`${this.configUrl}/${id}`);
  }

  public postBorne(borne: Borne): Observable<Borne> {
  //  const obs1: Observable<any> = this.http.post(`${this.configUrl}`, borne);
  //  const treatment = (param: any) => {
  //    return param as Borne;
  //  };
  //  return obs1.pipe(map(treatment));
    return this.http.post<Borne>(`${this.configUrl}`, borne);
  }

  public putBorn(id: string, borne: Borne): Observable<Borne> {
  //  const obs1: Observable<any> =
  //    this.http.put(`${this.configUrl}/${id}`, borne);
  //  const treatment = (param: any) => {
  //    return param as Borne;
  //  };
  //  return obs1.pipe(map(treatment));
    return this.http.put<Borne>(`${this.configUrl}/${id}`, borne);
  }

}
