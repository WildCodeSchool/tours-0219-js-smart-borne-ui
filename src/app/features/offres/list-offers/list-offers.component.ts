import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss'],
})
export class ListOffersComponent implements OnInit {
  public offers: Offer[];
  public filterId: string;
  public filterClient: string;
  public filterRemise: string;
  public filterDebut: string;
  public filterFin: string;
  constructor(public offersService: OffersService) { }

  ngOnInit() {
    this.getListOffers();
  }

  getListOffers() {
    this.offersService.getListOffers().subscribe((offers: Offer[]) => {
      this.offers = offers;
    });
  }
}
