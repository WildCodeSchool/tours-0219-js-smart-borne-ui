import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/models/user';
import { AuthService } from '../../core/authentication/auth.service';
import { MustMatch } from '../../shared/helper/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  roles = [
    { name: 'ADMINISTRATEUR' },
    { name: 'CLIENT' },
  ];

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private authenticationService: AuthService,
  ) {
  }

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  },                       {
    validator: MustMatch('password', 'confirmPassword'),
  },
  );

  ngOnInit() {
  }

  onSubmit() {
    this.toastr.warning('Being create', 'User being Create');
    this.authenticationService.register(
      this.userForm.value).subscribe(
      (user: User) => {
        this.userForm.patchValue(user);
        this.toastr.clear();
        this.toastr.success('success', 'User Created');
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      });
  }

}