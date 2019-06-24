import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../../shared/models/offres.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Client } from '../../shared/models/client-model';;
@Injectable({
  providedIn: 'root',
})
export class OffersService {
  configUrl = `${environment.apiUrl}/offer`;

  constructor(private http: HttpClient) { }

  public getListOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.configUrl}`);
  }

  public getOffer(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.configUrl}/${id}`);
  }

  public postOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.configUrl}`, offer);
  }

  public putOffer(id: string, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.configUrl}/${id}`, offer);
  }

  public deleteOffer(id: string): Observable<Offer> {
    return this.http.delete<Offer>(`${this.configUrl}/${id}`);
  }
  // public associateOffer(idOffer: string, idClient: string): Observable<Client> {
  //   return this.http.put<Client>(`http://localhost:3000/api/client/${idClient}/offer/${idOffer}`, {});
  // }
}
