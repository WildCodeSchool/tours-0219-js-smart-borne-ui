import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  configUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  public getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.configUrl}`);
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.configUrl}/${id}`);
  }

  public putUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.configUrl}/${id}`, user);
  }

}
