import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Borne } from '../../shared/models/borne';
import { environment } from '../../../environments/environment';
import { LoadingService } from './loading.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BorneService {
  configUrl = `${environment.apiUrl}/bornes`;

  constructor(private http: HttpClient, private loading: LoadingService) { }

  public getListBorne(): Observable<Borne[]> {
    this.loading.isloading$.next(true);
    return this.http.get<Borne[]>(`${this.configUrl}`).pipe(
      tap(() => this.loading.isloading$.next(false)));
  }

  public getBorneById(id: string): Observable<Borne> {
    return this.http.get<Borne>(`${this.configUrl}/${id}`);
  }

  public postBorne(borne: Borne): Observable<Borne> {
    return this.http.post<Borne>(`${this.configUrl}`, borne);
  }

  public putBorn(id: string, borne: Borne): Observable<Borne> {
    return this.http.put<Borne>(`${this.configUrl}/${id}`, borne);
  }

  public deleteBorne(id: string): Observable<Borne> {
    return this.http.delete<Borne>(`${this.configUrl}/${id}`);
  }

  public associateOffer(idBorne: string, idOffer: string): Observable<Borne> {
    return this.http.put<Borne>(`${this.configUrl}/${idBorne}/offer/${idOffer}`, {});
  }
  public dissocierOffer(idBorne: string, idOffer: string): Observable<Borne> {
    return this.http.delete<Borne>(`${this.configUrl}/${idBorne}/offer/${idOffer}`, {});
  }
  public associateClient(idClient: string, idBorne: string): Observable<Borne> {
    return this.http.put<Borne>(`${this.configUrl}/${idBorne}/client/${idClient}`, {});
  }

}
