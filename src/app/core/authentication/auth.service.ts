import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  configUrl = `${environment.apiUrl}/auth`;
  public user: boolean;

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.configUrl}/register`, user);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.configUrl}/login`, { email, password })
      .pipe(tap((user) => {
        if (user) {
          this.user = true;
          localStorage.setItem('accessToken', user.accessToken);
        }
      }));
  }

  isLogin() {
    if (localStorage.getItem('accessToken')) {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.user = false;
  }
}
