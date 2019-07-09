import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    this.toastr.warning('Demande prise en compte', 'En attente de réponse');
    this.authenticationService.register(
      this.userForm.value).subscribe(
      () => {
        this.userForm.reset();
        this.toastr.clear();
        this.toastr.success('Succès', 'Utilisateur créé');
        // this.router.navigateByUrl('/');
      },
      (error) => {
        this.userForm.reset();
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      });
  }

}
