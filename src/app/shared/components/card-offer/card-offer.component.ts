import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../models/offres.models';

@Component({
  selector: 'app-card-offer',
  templateUrl: './card-offer.component.html',
  styleUrls: ['./card-offer.component.scss'],
})
export class CardOfferComponent implements OnInit {
  public offers: Offer[];
  constructor(public offersService: OffersService) { }

  ngOnInit() {
    this.getListoffers();
  }

  getListoffers() {
    this.offersService.getListOffers().subscribe((offers: Offer[]) => {
      this.offers = offers;
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
}
