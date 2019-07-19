
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService,
              public router: Router,
              private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('accessToken');
    const tokenPayload = jwtDecode(token);

    if (
      !this.auth.isAuthenticated() ||
      tokenPayload.role !== expectedRole
    ) {

      this.toastr.error(`Vous n'avez pas l'autorisation`);
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
