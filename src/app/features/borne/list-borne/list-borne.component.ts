import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { Borne } from '../../../shared/models/borne';
import { first } from 'rxjs/operators';
import { ClientService } from 'src/app/core/http/client.service';
import { Client } from '../../../shared/models/client-model';
import { User } from '../../../shared/models/user';
import { ProfileService } from '../../../core/http/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-borne',
  templateUrl: './list-borne.component.html',
  styleUrls: ['./list-borne.component.scss'],
})
export class ListBorneComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    public borneService: BorneService,
    public clientService: ClientService,
    public router: Router,
    private fb: FormBuilder,
    ) {
  }
  public bornes: Borne[];
  public clients: Client[];
  public user: User;
  public filterNumeroSerie: string;
  public filterVille: string;
  public filterBac1: string;
  public filterBac2: string;
  public filterTotal: string;
  public filterDate: string;

  queryForm = this.fb.group({
    query: ['', [Validators.required]],
  });

  ngOnInit() {
    this.clientService.getListClient().pipe(first()).subscribe((clients) => {
      this.clients = clients;
    });
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
    });

    this.route.queryParams.subscribe((params) => {
      if (params.numeroSerie) {
        this.borneService.getQueryBorne(params.numeroSerie).subscribe((borne) => {
          this.bornes = borne;
        });
      } else {
        this.getListBorne();
      }
    });

  }

  getListBorne() {
    this.borneService.getListBorne().subscribe(
      (bornes: Borne[]) => {
        this.bornes = bornes;
      },
    );
  }

  onSubmit() {
    this.router.navigate(['/bornes'], {
      queryParams: { numeroSerie:  this.queryForm.value.query } });
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
