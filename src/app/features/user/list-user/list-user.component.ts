import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../core/http/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  public users: User[];
  public filterId: string;
  public filterLastname: string;
  public filterEmail: string;
  public filterRole: string;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(
      (users: User[]) => {
        this.users = users;
      },
    );
  }

}
