import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/models/client-model';
import { ClientService } from '../../../core/http/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit {
  public clients: Client[];
  public filterId: string;
  public filterName: string;
  public filterRaisonSocial: string;
  public filterCoupon: string;

  constructor(public clientService: ClientService,
              private route: ActivatedRoute,
              public router: Router,
              private fb: FormBuilder) {
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

  getCreateClient(client) {
    this.clients.push(client);
    this.clientService.getListClient().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      },
    );
  }

  calculatePercentage(a, b) {
    const result = Math.round(a / b * 100) ;
    if (isNaN(result)) {
      return 0;
    }
    return result;
  }

  color(a: number) {
    if (a >= 90) {
      return 'danger';
    } if (a >= 65) {
      return 'warning';
    }
    return 'success';

  }
}
