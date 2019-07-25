import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../core/http/user.service';
import { ClientService } from '../../../core/http/client.service';
import { Client } from '../../../shared/models/client-model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  public users: User[];
  public client: Client[];
  public filterId: string;
  public filterLastname: string;
  public filterEmail: string;
  public filterRole: string;

  constructor(public userService: UserService,
              public clientService: ClientService) {
  }

  ngOnInit() {
    this.getAllUser();
    this.clientService.getListClient().pipe(first()).subscribe((client) => {
      this.client = client;
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(
      (users: User[]) => {
        this.users = users;
      },
    );
  }

}
