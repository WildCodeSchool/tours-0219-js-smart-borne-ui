import { Component, OnInit } from '@angular/core';
import { BorneService } from 'src/app/core/http/borne.service';
import { Borne } from '../../shared/models/borne';
import { OffersService } from '../../core/http/offers.service';
import { Offer } from '../../shared/models/offres.models';
import { DataService } from 'src/app/core/http/data.service';
import { Data } from 'src/app/shared/models/data.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartType = 'bar';
  public barChartLegend = true;

  public days = true;
  public barChartLabelsDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  public barChartDataDays = [
    {
      data: [],
      label: 'Plastique',
      backgroundColor: 'rgb(65,105,225,0.6)',
      borderColor: 'rgb(65,105,225)',
      hoverBackgroundColor: 'rgb(65,105,225)',
      hoverBorderColor: 'rgb(65,105,225,0.6)',
    },
    {
      data: [],
      label: 'Cannettes',
      backgroundColor: 'rgb(160,82,45,0.6)',
      borderColor: 'rgb(160,82,45)',
      hoverBackgroundColor: 'rgb(160,82,45)',
      hoverBorderColor: 'rgb(160,82,45,0.6)',
    },
  ];

  public weeks = false;
  public barChartLabelsWeeks = ['Semaine 01', 'Semaine 02', 'Semaine 03', 'Semaine 04'];
  public barChartDataWeeks = [
    {
      data: [],
      label: 'Plastique',
      backgroundColor: 'rgb(65,105,225,0.6)',
      borderColor: 'rgb(65,105,225)',
      hoverBackgroundColor: 'rgb(65,105,225)',
      hoverBorderColor: 'rgb(65,105,225,0.6)',
    },
    {
      data: [],
      label: 'Cannettes',
      backgroundColor: 'rgb(160,82,45,0.6)',
      borderColor: 'rgb(160,82,45)',
      hoverBackgroundColor: 'rgb(160,82,45)',
      hoverBorderColor: 'rgb(160,82,45,0.6)',
    },
  ];

  public months = false;
  public barChartLabelsMonths = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai',
    'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  public barChartDataMonths = [
    {
      data: [],
      label: 'Plastique',
      backgroundColor: 'rgb(65,105,225,0.6)',
      borderColor: 'rgb(65,105,225)',
      hoverBackgroundColor: 'rgb(65,105,225)',
      hoverBorderColor: 'rgb(65,105,225,0.6)',
    },
    {
      data: [],
      label: 'Cannettes',
      backgroundColor: 'rgb(160,82,45,0.6)',
      borderColor: 'rgb(160,82,45)',
      hoverBackgroundColor: 'rgb(160,82,45)',
      hoverBorderColor: 'rgb(160,82,45,0.6)',
    },
  ];

  public totalCannettes = 0;
  public totalPlastique = 0;

  public doughnutData = [];
  public labels = ['Cannettes', 'Plastique'];
  public type = 'doughnut';

  public topBornesBacUn: Borne[];
  public topBornesBacDeux: Borne[];
  public topBornesRouleaux: Borne[];
  public topOffres: Offer[];

  constructor(public borneService: BorneService,
              public offersService: OffersService,
              public dataService: DataService) { }

  ngOnInit() {
    this.getListBornes();
    this.getListOffers();
    this.getDatas();
  }

  getListBornes() {
    this.borneService.getListBorne().subscribe(
      (bornes: Borne[]) => {
        this.topBornesBacUn = [...bornes.sort((a, b) => b.taux.bacUn - a.taux.bacUn)];
        this.topBornesBacDeux = [...bornes.sort((a, b) => b.taux.bacDeux - a.taux.bacDeux)];
        this.topBornesRouleaux = [...bornes.sort((a, b) => a.coupon.restant - b.coupon.restant)];
// tslint:disable-next-line: ter-arrow-parens
        bornes.map(a => {
          this.totalCannettes += a.cannette.total;
          this.totalPlastique += a.plastique.total;
        });
        this.doughnutData.push(this.totalCannettes);
        this.doughnutData.push(this.totalPlastique);
      },
    );
  }

  getDatas() {
    this.dataService.getAllDataByDay().subscribe(
      (dataDays: Data[]) => {
        dataDays.map(a => {
          this.barChartDataDays[0].data.push(a.plastique);
          this.barChartDataDays[1].data.push(a.metal);
        });
      },
    );
    this.dataService.getAllDataByWeek().subscribe(
      (dataWeek: Data[]) => {
        dataWeek.map(a => {
          this.barChartDataWeeks[0].data.push(a.plastique);
          this.barChartDataWeeks[1].data.push(a.metal);
        });
      },
    );
    this.dataService.getAllDataByMonth().subscribe(
      (dataMonth: Data[]) => {
        dataMonth.map(a => {
          this.barChartDataMonths[0].data.push(a.plastique);
          this.barChartDataMonths[1].data.push(a.metal);
        });
      },
    );
  }

  getListOffers() {
    this.offersService.getListOffers().subscribe(
      (offers: Offer[]) => {
        this.topOffres = [...offers.sort((a, b) =>
          (Math.round(b.coupon.imprime / b.coupon.total * 100)) - (Math.round(a.coupon.imprime / a.coupon.total * 100)))];
      },
    );
  }

  tauxRouleau(couponsRestants) {
    return Math.round((350 - couponsRestants) / 3.5);
  }

  tauxOffre(couponsImprimes, couponsRestants) {
    return Math.round(couponsImprimes / couponsRestants * 100);
  }

  color(a: number) {
    if (a >= 90) {
      return 'danger';
    } if (a >= 65) {
      return 'warning';
    }
    return 'success';
  }

  toggleDays() {
    this.days = true;
    this.weeks = false;
    this.months = false;
  }

  toggleWeeks() {
    this.days = false;
    this.weeks = true;
    this.months = false;
  }

  toggleMonths() {
    this.days = false;
    this.weeks = false;
    this.months = true;
  }

}
