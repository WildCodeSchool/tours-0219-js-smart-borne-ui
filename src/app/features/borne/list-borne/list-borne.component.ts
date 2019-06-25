import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { Borne } from '../../../shared/models/borne';
import { first } from 'rxjs/operators';
import { ClientService } from 'src/app/core/http/client.service';
import { Client } from '../../../shared/models/client-model';
@Component({
  selector: 'app-list-borne',
  templateUrl: './list-borne.component.html',
  styleUrls: ['./list-borne.component.scss'],
})
export class ListBorneComponent implements OnInit {
  public bornes: Borne[];
  public clients: Client[];
  public filterNumeroSerie: string;
  public filterVille: string;
  public filterBac1: string;
  public filterBac2: string;
  public filterTotal: string;
  public filterDate: string;
  

  constructor(
    public borneService: BorneService,
    public clientService: ClientService,
    ) {
  }
  ngOnInit() {
    this.getListBorne();
    this.clientService.getListClient().pipe(first()).subscribe((clients) => {
      this.clients = clients;
    });
  }

  getListBorne() {
    this.borneService.getListBorne().subscribe(
      (bornes: Borne[]) => {
        this.bornes = bornes;
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

}
