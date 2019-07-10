import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Client } from '../../../shared/models/client-model';
import { ProfileService } from '../../../core/http/profile.service';
import { Borne } from '../../../shared/models/borne';
import { ClientService } from '../../../core/http/client.service';
import { User } from '../../../shared/models/user';
import { BorneService } from '../../../core/http/borne.service';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss'],
})
export class ListOffersComponent implements OnInit {
  public offers: Offer[];
  public borneByOffer: any;
  public user: User;
  public filterId: string;
  public filterClient: string;
  public filterRemise: string;
  public filterDebut: string;
  public filterFin: string;

  constructor(public offersService: OffersService,
              private route: ActivatedRoute,
              public router: Router,
              private fb: FormBuilder,
              private profileService: ProfileService,
              public  borneService: BorneService) {
  }

  queryForm = this.fb.group({
    query: ['', [Validators.required]],
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.client) {
        this.offersService.getQueryOffer(params.client).subscribe((client) => {
          this.offers = client;
        });
      } else {
        this.getListOffers();
      }
    });
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
      this.borneService.getBorneById(users.clients[0]._id).subscribe(
        (borne: Borne) => {
          this.borneByOffer = borne.offers;
          console.log();
        });
    });
  }

  color(taux: number) {
    if (taux >= 90) {
      return 'danger';
    } if (taux >= 65) {
      return 'warning';
    }
    return 'success';
  }

  getListOffers() {
    this.offersService.getListOffers().subscribe((offers: Offer[]) => {
      this.offers = offers;
    });
    console.log(this.offers);
  }

  onSubmit() {
    this.router.navigate(['/offers'], {
      queryParams: { client:  this.queryForm.value.query } });
  }
}
