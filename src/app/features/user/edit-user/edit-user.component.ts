import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../core/http/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ClientService } from '../../../core/http/client.service';
import { Client } from '../../../shared/models/client-model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public user: User;
  public id: string;
  public client: Client[];
  public roles = [
    { name: 'ADMINISTRATEUR' },
    { name: 'CLIENT' },
  ];

  constructor(public userService: UserService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              public clientService: ClientService) {
  }

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
    client: [''],
  });

  ngOnInit() {
    this.clientService.getListClient().pipe(first()).subscribe((client) => {
      this.client = client;
    });

    this.route.paramMap.subscribe((id: ParamMap) => {
      this.id = id.get('id');
      if (this.id) {
        this.userService.getUserById(this.id).subscribe(
          (user: User) => {
            this.user = user;
            this.userForm.patchValue(user);
          },
        );
      }
    });
  }

  onSubmit() {
    this.toastr.warning('Being Updater', 'User being Updater');
    this.userService.putUser(
      this.id, this.userForm.value).subscribe(
      (user: User) => {
        this.clientService.associateUser(this.userForm.value.client, this.user._id).subscribe(
          () => {
            this.toastr.clear();
            this.toastr.success('success', 'client associer');
            // this.router.navigateByUrl('offers');
          },
          (error) => {
            this.toastr.clear();
            this.toastr.error(`Error ${error}`);
          });
        this.userForm.patchValue(user);
        this.toastr.clear();
        this.toastr.success('success', 'User Updater');
        // this.router.navigateByUrl('/dashboard/user');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      });
  }
}
