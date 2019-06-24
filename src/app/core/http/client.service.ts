import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Client } from '../../shared/models/client-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  configUrl = `${environment.apiUrl}/client`;

  constructor(private http: HttpClient) { }

  public getListClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.configUrl}`);
  }

  public getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.configUrl}/${id}`);
  }

  public postClient(clients: Client): Observable<Client> {
    return this.http.post<Client>(`${this.configUrl}`, clients);
  }

  public putClient(id: string, clients: Client): Observable<Client> {
    return this.http.put<Client>(`${this.configUrl}/${id}`, clients);
  }
  public deleteClient(id: string): Observable<Client> {
    return this.http.delete<Client>(`${this.configUrl}/${id}`);
  }
  public associateOffer(idClient: string, idOffer: string,): Observable<Client> {
    return this.http.put<Client>(`http://localhost:3000/api/client/${idClient}/offer/${idOffer}`, {});
  }
  public associateUser(idClient: string, idUser: string): Observable<Client> {
    return this.http.put<Client>(`http://localhost:3000/api/users/${idClient}/user/${idUser}`, {});
  }
}
