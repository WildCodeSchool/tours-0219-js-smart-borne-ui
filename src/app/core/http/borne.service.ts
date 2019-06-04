import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Borne } from '../../shared/models/borne';

@Injectable({
  providedIn: 'root',
})
export class BorneService {

  configUrl = `http://localhost:3000/api/bornes`;

  constructor(private http: HttpClient) {
  }

  public getListBorne(): Observable<Borne> {
    const obs1: Observable<any> = this.http.get(`${this.configUrl}`);
    const treatment = (param: any) => {
      return param as Borne;
    };
    return obs1.pipe(map(treatment));
  }

  public getBorneById(id: string): Observable<Borne> {
    const obs1: Observable<any> = this.http.get(`${this.configUrl}/${id}`);
    const treatment = (param: any) => {
      return param as Borne;
    };
    return obs1.pipe(map(treatment));
  }

  public postBorne(borne: any): Observable<Borne> {
    const obs1: Observable<any> = this.http.post(`${this.configUrl}`, borne);
    const treatment = (param: any) => {
      return param as Borne;
    };
    return obs1.pipe(map(treatment));
  }

  public putBorn(id: string, borne: any): Observable<Borne> {
    const obs1: Observable<any> =
      this.http.put(`${this.configUrl}/${id}`, borne);
    const treatment = (param: any) => {
      return param as Borne;
    };
    return obs1.pipe(map(treatment));
  }
}
