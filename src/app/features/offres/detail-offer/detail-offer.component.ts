import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Offer } from '../../../shared/models/offres.models';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.scss'],
})
export class DetailOfferComponent implements OnInit {
  public offer: Offer;
  public id: string;
  public couponsData = [50];
  public couponsLabels = ['Coupons imprimés'];
  public couponsType = 'doughnut';

  constructor(private route: ActivatedRoute, public offerService: OffersService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getOffer();
    });
  }

  getOffer() {
    this.offerService.getOffer(this.id).subscribe(
      (offer: Offer) => {
        this.offer = offer;
      },
    );
  }

}
