import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Client } from '../../shared/models/clients-models';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  configUrl = 'http://localhost:3000/api/client';

  constructor(private http: HttpClient) {
  }

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
}
