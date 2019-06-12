import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../../shared/models/offres.models';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class OffersService {
  configUrl = `${environment.apiUrl}/offres`;

  constructor(private http: HttpClient) { }

  public getListOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.configUrl}`);
  }

  public getOfferById(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.configUrl}/${id}`);
  }

  public postOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.configUrl}`, offer);
  }

  public putOffer(id: string, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.configUrl}/${id}`, offer);
  }
}
