import { Component, OnInit } from '@angular/core';
import { BorneService } from 'src/app/core/http/borne.service';
import { Borne } from '../../shared/models/borne';
import { OffersService } from '../../core/http/offers.service';
import { Offer } from '../../shared/models/offres.models';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public topBornesBacUn: Borne[];
  public topBornesBacDeux: Borne[];
  public topBornesRouleaux: Borne[];
  public topOffres: Offer[];

  public rouleauxTauxUn = 0;
  public rouleauxTauxDeux = 0;
  public rouleauxTauxTrois = 0;

  public firstOffreTaux = 0;
  public secondOffreTaux = 0;
  public thirdOffreTaux = 0;

  public plastiqueData = [50];
  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';

  public cannetteData = [50];
  public cannetteLabels = ['Cannette'];
  public cannetteType = 'doughnut';

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai',
    'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], labels: 'Plastique' },
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], labels: 'Cannettes' },
  ];

  constructor(public borneService: BorneService,
    public offersService: OffersService) { }


  ngOnInit() {
    this.getListBornes();
    this.getListOffers();
  }

  getListBornes() {
    this.borneService.getListBorne().subscribe(
      (bornes: Borne[]) => {
        this.topBornesBacUn = [...bornes.sort((a, b) => b.taux.bacUn - a.taux.bacUn)];
        this.topBornesBacDeux = [...bornes.sort((a, b) => b.taux.bacDeux - a.taux.bacDeux)];
        this.topBornesRouleaux = [...bornes.sort((a, b) => a.coupon.restant - b.coupon.restant)];

        this.rouleauxTauxUn = Math.round((350 - this.topBornesRouleaux[0].coupon.restant) / 3.5);
        this.rouleauxTauxDeux = Math.round((350 - this.topBornesRouleaux[1].coupon.restant) / 3.5);
        this.rouleauxTauxTrois = Math.round((350 - this.topBornesRouleaux[2].coupon.restant) / 3.5);
        console.log(this.rouleauxTauxDeux);
      },
    );
  }

  getListOffers() {
    this.offersService.getListOffers().subscribe(
      (offers: Offer[]) => {
        this.topOffres = [...offers.sort((a, b) => b.coupon.imprime - a.coupon.imprime)];

        this.firstOffreTaux = Math.round(this.topOffres[0].coupon.imprime / this.topOffres[0].coupon.total * 100);
        this.secondOffreTaux = Math.round(this.topOffres[1].coupon.imprime / this.topOffres[1].coupon.total * 100);
        this.thirdOffreTaux = Math.round(this.topOffres[2].coupon.imprime / this.topOffres[2].coupon.total * 100);
      },
    );
  }

}
