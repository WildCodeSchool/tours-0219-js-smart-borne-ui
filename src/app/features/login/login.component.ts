import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/authentication/auth.service';
import { ProfileService } from '../../core/http/profile.service';
import { User } from '../../shared/models/user';
import { UserService } from '../../core/http/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder,
              public authenticationService: AuthService,
              public profileService: ProfileService,
              public userService: UserService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.authenticationService.logout();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        () => {
          this.profileService.getProfile().subscribe(
            (profil: User) => {
              this.userService.getUserById(profil._id).subscribe(
                (user: User) => {
                  this.toastr.success('Success', 'Connection success');
                  if (user.role !== 'ADMINISTRATEUR') {
                    this.router.navigateByUrl(`/client/${user.clients[0]._id}`);
                  } else {
                    this.router.navigateByUrl('/dashboard');
                  }
                },
              );
            },
          );
        },
        (error) => {
          this.error = error;
          this.loginForm.reset();
        });
  }
}
