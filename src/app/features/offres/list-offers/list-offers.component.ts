import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../../core/http/profile.service';
import { User } from '../../../shared/models/user';
import { BorneService } from '../../../core/http/borne.service';
import { ClientService } from '../../../core/http/client.service';
import { Client } from '../../../shared/models/client-model';

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
              public  borneService: BorneService,
              public clientService: ClientService) {
  }

  ngOnInit() {
    this.getListOffers();
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
      this.clientService.getClientById(users.clients[0]._id).subscribe(
        (client: Client) => {
          this.borneByOffer = client.offer;
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
  }

  getCreateOffer(offer) {
    this.offers.push(offer);
    this.offersService.getListOffers().subscribe(
      (offers: Offer[]) => {
        this.offers = offers;
      },
    );
  }

}
