import { Component, OnInit } from '@angular/core';
import { BorneService } from 'src/app/core/http/borne.service';
import { Borne } from '../../shared/models/borne';
import { OffersService } from '../../core/http/offers.service';
import { Offer } from '../../shared/models/offres.models';
import { DataService } from 'src/app/core/http/data.service';
import { Data } from 'src/app/shared/models/data.model';
import { ProfileService } from '../../core/http/profile.service';
import { User } from '../../shared/models/user';
import { Client } from 'src/app/shared/models/client-model';
import { ClientService } from 'src/app/core/http/client.service';

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
      label: 'Métal',
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
      label: 'Métal',
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
      label: 'Métal',
      backgroundColor: 'rgb(160,82,45,0.6)',
      borderColor: 'rgb(160,82,45)',
      hoverBackgroundColor: 'rgb(160,82,45)',
      hoverBorderColor: 'rgb(160,82,45,0.6)',
    },
  ];

  public totalMetal = 0;
  public totalPlastique = 0;

  public doughnutData = [];
  public labels = ['Métal', 'Plastique'];
  public type = 'doughnut';
  public doughnutChartColors =
    [
      {
        backgroundColor: ['rgb(160,82,45,0.6)', 'rgb(65,105,225,0.6)'],
        borderColor: ['rgba(160,82,45,1)', 'rgb(65,105,225,1)'],
      },
    ];

  public topBornesMetal: Borne[];
  public topBornesPlastique: Borne[];
  public topBornesRouleaux: Borne[];
  public topOffres: Offer[];
  public profile: User;
  public client: Client;
  public id: string;

  constructor(public borneService: BorneService,
              public offersService: OffersService,
              public dataService: DataService,
              public profileService: ProfileService,
              public clientService: ClientService) { }

  ngOnInit() {
    this.getProfile();
    this.getListBornes();
    this.getListOffers();
    this.getDatas();
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      (user: User) => {
        this.profile = user;
      },
    );
  }

  getListBornes() {
    this.borneService.getListBorne().subscribe(
      (bornes: Borne[]) => {
        this.topBornesMetal = [...bornes.sort((a, b) => b.metal.taux - a.metal.taux)];
        this.topBornesPlastique = [...bornes.sort((a, b) => b.plastique.taux - a.plastique.taux)];
        this.topBornesRouleaux = [...bornes.sort((a, b) => b.coupon.imprimer - a.coupon.imprimer)];
        // tslint:disable-next-line: ter-arrow-parens
        bornes.map(borne => {
          this.totalMetal += borne.metal.total;
          this.totalPlastique += borne.plastique.total;
        });
        this.doughnutData.push(this.totalMetal);
        this.doughnutData.push(this.totalPlastique);
      },
    );
  }

  getClient() {
    this.clientService.getClientById(this.id).subscribe(
      (client: Client) => {
        this.client = client;
        // tslint:disable-next-line: ter-arrow-parens
        client.bornes.map(borne => {
          this.totalPlastique += borne.plastique.total;
          this.totalMetal += borne.metal.total;
        });
        this.doughnutData.push(this.totalPlastique);
        this.doughnutData.push(this.totalMetal);
      },
    );
  }

  getDatas() {
    this.dataService.getAllDataByDay().subscribe(
      (dataDays: Data[]) => {
        // tslint:disable-next-line: ter-arrow-parens
        dataDays.map(a => {
          this.barChartDataDays[0].data.push(a.plastique);
          this.barChartDataDays[1].data.push(a.metal);
        });
      },
    );
    this.dataService.getAllDataByWeek().subscribe(
      (dataWeek: Data[]) => {
        // tslint:disable-next-line: ter-arrow-parens
        dataWeek.map(a => {
          this.barChartDataWeeks[0].data.push(a.plastique);
          this.barChartDataWeeks[1].data.push(a.metal);
        });
      },
    );
    this.dataService.getAllDataByMonth().subscribe(
      (dataMonth: Data[]) => {
        // tslint:disable-next-line: ter-arrow-parens
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

  tauxOffre(couponsImprimes, couponsTotal) {
    if (couponsImprimes !== 0) {
      return Math.round((couponsImprimes / couponsTotal) * 100);
    }
    return 0;
  }

  color(taux: number) {
    if (taux >= 90) {
      return 'danger';
    } if (taux >= 65) {
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
