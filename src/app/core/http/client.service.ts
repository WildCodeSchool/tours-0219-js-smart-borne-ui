import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Clients } from '../../shared/models/clients-models';

@Injectable({
    providedIn: 'root',
})
export class ClientService {

    configUrl = `http://localhost:3000/api/client`;

    constructor(private http: HttpClient) {
    }

    public getListClient(): Observable<Clients> {
        const obs1: Observable<any> = this.http.get(`${this.configUrl}`);
        const treatment = (param: any) => {
            return param as Clients;
        };
        return obs1.pipe(map(treatment));
    }

    public getClientById(id: string): Observable<Clients> {
        const obs1: Observable<any> = this.http.get(`${this.configUrl}/${id}`);
        const treatment = (param: any) => {
            return param as Clients;
        };
        return obs1.pipe(map(treatment));
    }

    public postClient(clients: any): Observable<Clients> {
        const obs1: Observable<any> = this.http.post(`${this.configUrl}`, clients);
        const treatment = (param: any) => {
            return param as Clients;
        };
        return obs1.pipe(map(treatment));
    }

    public putClient(id: string, clients: any): Observable<Clients> {
        const obs1: Observable<any> =
            this.http.put(`${this.configUrl}/${id}`, clients);
        const treatment = (param: any) => {
            return param as Clients;
        };
        return obs1.pipe(map(treatment));
    }
}