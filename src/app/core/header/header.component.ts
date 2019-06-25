import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/models/user';
import { ProfileService } from '../http/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = false;
  public profile: User;

  constructor(private router: Router,
    private authenticationService: AuthService,
    public profileService: ProfileService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.authenticationService.isLogin()) {
      this.getProfile();
    }
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      (user: User) => {
        this.profile = user;

      },
    );
  }

  logout() {
    this.authenticationService.logout();
    this.toastr.success('Success', 'Profile logout');
    this.router.navigateByUrl('/');
  }

}
