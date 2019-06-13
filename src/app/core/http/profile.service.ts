import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  configUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {
  }

  public getProfile(): Observable<User> {
    return this.http.get<User>(`${this.configUrl}`);
  }

}
