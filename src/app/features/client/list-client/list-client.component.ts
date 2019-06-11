import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/models/client-model';
import { ClientService } from '../../../core/http/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit {
  public clients: Client[];
  constructor(public clientService: ClientService) {
  }
  ngOnInit() {
    this.getListClient();
  }
  getListClient() {
    this.clientService.getListClient().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      },
    );
  }
}
