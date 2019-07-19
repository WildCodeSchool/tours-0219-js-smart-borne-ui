import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/models/client-model';
import { ClientService } from '../../../core/http/client.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, timestamp } from 'rxjs/operators';
import { ProfileService } from '../../../core/http/profile.service';
import { User } from '../../../shared/models/user';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';
import { FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BorneService } from 'src/app/core/http/borne.service';
import { Borne } from '../../../shared/models/borne';
import { DataService } from 'src/app/core/http/data.service';
import { Data } from 'src/app/shared/models/data.model';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss'],
})
export class DetailClientComponent implements OnInit {

  public closeResult: string;
  public clients: Client[];
  public client: Client;
  public user: User;
  public offers: Offer[];
  public borne: Borne;
  public id: string;
  public bornes: Borne[];
  public idHidden: boolean;

  public totalPlastique: number = 0;
  public totalMetal: number = 0;

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
      data: [0, 0, 0, 0, 0, 0, 0],
      label: 'Plastique',
      backgroundColor: 'rgb(65,105,225,0.6)',
      borderColor: 'rgb(65,105,225)',
      hoverBackgroundColor: 'rgb(65,105,225)',
      hoverBorderColor: 'rgb(65,105,225,0.6)',
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0],
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
      data: [0, 0, 0, 0],
      label: 'Plastique',
      backgroundColor: 'rgb(65,105,225,0.6)',
      borderColor: 'rgb(65,105,225)',
      hoverBackgroundColor: 'rgb(65,105,225)',
      hoverBorderColor: 'rgb(65,105,225,0.6)',
    },
    {
      data: [0, 0, 0, 0],
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
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Plastique',
      backgroundColor: 'rgb(65,105,225,0.6)',
      borderColor: 'rgb(65,105,225)',
      hoverBackgroundColor: 'rgb(65,105,225)',
      hoverBorderColor: 'rgb(65,105,225,0.6)',
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Métal',
      backgroundColor: 'rgb(160,82,45,0.6)',
      borderColor: 'rgb(160,82,45)',
      hoverBackgroundColor: 'rgb(160,82,45)',
      hoverBorderColor: 'rgb(160,82,45,0.6)',
    },
  ];

  public topBornesMetal: Borne[];
  public topBornesPlastique: Borne[];
  public topBornesRouleaux: Borne[];
  public topOffres: Offer[];

  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService,
    public offerService: OffersService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private profileService: ProfileService,
    private borneService: BorneService,
    private modalService: NgbModal,
    public dataService: DataService) { }

  assoOfferForm = this.fb.group({
    offer: [''],
  });
  FormDelete = this.fb.group({
    client: [''],
  });
  Form = this.fb.group({
    borne: [''],
  });
  DeleteAssociateBorne = this.fb.group({
    borne: [''],
  });
  DeleteAssociateOffer = this.fb.group({
    offer: [''],
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getClient();
    });
    this.profileService.getProfile().pipe(first()).subscribe((user) => {
      this.user = user;
    });
    this.offerService.getListOffers().pipe(first()).subscribe((offers) => {
      this.offers = offers;
    });
    this.borneService.getListBorne().pipe(first()).subscribe((borne) => {
      this.bornes = borne;
    });
  }

  hiddenButton() {
    this.idHidden = ! this.idHidden;
  }

  getClient() {
    this.clientService.getClientById(this.id).subscribe(
      (client: Client) => {
        this.client = client;
        // tslint:disable-next-line: ter-arrow-parens
        this.topBornesMetal = [...client.bornes.sort((a, b) => b.metal.taux - a.metal.taux)];
        this.topBornesPlastique = [...client.bornes.sort((a, b) => b.plastique.taux - a.plastique.taux)];
        this.topBornesRouleaux = [...client.bornes.sort((a, b) => b.coupon.imprimer - a.coupon.imprimer)];
        this.topOffres = [...client.offer.sort((a, b) =>
          (Math.round(b.coupon.imprime / b.coupon.total * 100)) - (Math.round(a.coupon.imprime / a.coupon.total * 100)))];
        // tslint:disable-next-line: ter-arrow-parens
        this.client.bornes.map(borne => {
          this.totalPlastique += borne.plastique.total;
          this.totalMetal += borne.metal.total;
        });
        this.doughnutData.push(this.totalMetal);
        this.doughnutData.push(this.totalPlastique);
        this.getData();
      },
    );

  }

  deleteClientModal() {
    const id = this.FormDelete.value.client;
    if (id === this.id) {
      this.clientService.getClientById(id).subscribe(
        (client: Client) => {
          if (client) {
            this.clientService.deleteClient(client._id).subscribe();
            this.toastr.error('Suppression', 'Client supprimé');
            this.router.navigateByUrl(`clients`);
          }
        },
      );
    } else {
      this.FormDelete.reset();
      this.toastr.error('L \'id ne correspond pas');
    }
  }

  getData() {
    // tslint:disable-next-line: ter-arrow-parens
    this.client.bornes.map(borne => {
      this.dataService.getBorneDataByDay(borne._id).subscribe(
        (dataDays: Data[]) => {
          // tslint:disable-next-line: no-increment-decrement
          for (let i = 0; i < dataDays.length; i++) {
            this.barChartDataDays[0].data[i] += dataDays[i].plastique;
            this.barChartDataDays[1].data[i] += dataDays[i].metal;
          }
        },
      );
      this.dataService.getBorneDataByWeek(borne._id).subscribe(
        (dataWeeks: Data[]) => {
          // tslint:disable-next-line: no-increment-decrement
          for (let i = 0; i < dataWeeks.length; i++) {
            this.barChartDataWeeks[0].data[i] += dataWeeks[i].plastique;
            this.barChartDataWeeks[1].data[i] += dataWeeks[i].metal;
          }
        },
      );
      this.dataService.getBorneDataByMonth(borne._id).subscribe(
        (dataMonths: Data[]) => {
          // tslint:disable-next-line: no-increment-decrement
          for (let i = 0; i < dataMonths.length; i++) {
            this.barChartDataMonths[0].data[i] += dataMonths[i].plastique;
            this.barChartDataMonths[1].data[i] += dataMonths[i].metal;
          }
        },
      );
    });
  }

  deleteBorne(id) {
    const r = confirm('Êtes-vous sûr ?');
    if (r) {
      this.borneService.deleteBorne(id).subscribe();
      this.toastr.error('Suppression', 'Borne supprimée');
      this.router.navigateByUrl(`bornes`);
    }
  }

  assoClient() {
    this.borneService.getBorneById(this.Form.value.borne).pipe(first()).subscribe((borne) => {
      this.borneService.associateClient(this.client._id, this.Form.value.borne).subscribe(
        () => {
          this.client.bornes.push(borne);
          this.toastr.clear();
          this.toastr.success('Succès', 'Borne associée');
        },
        (error) => {
          this.toastr.clear();
          this.toastr.error(`Error ${error}`);
        });
    });
  }

  onSubmit() {
    const result = this.client.offer.filter(offers => offers._id === this.assoOfferForm.value.offer);
    if (result[0]) {
      this.toastr.error(`Cette offre est déjà associée`);
    } else {
      this.clientService.associateOffer(this.client._id, this.assoOfferForm.value.offer).subscribe(
        () => {
          this.offerService.getOffer(this.assoOfferForm.value.offer).pipe(first()).subscribe((offer) => {
            const offre = this.client.offer.filter(offers => offers._id === offer._id);
            if (offre.length >= 1) {
              this.toastr.error(`Error Déjà associée`);
            } else {
              this.client.offer.push(offer);
            }
          });
          this.toastr.clear();
          this.toastr.success('success', 'Offre associée');
          // this.router.navigateByUrl('offers');
        },
        (error) => {
          this.toastr.clear();
          this.toastr.error(`Error ${error}`);
        });
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // tslint:disable-next-line: align
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    return `with: ${reason}`;
  }

  dissoBorne(id) {
    const idBorne = this.DeleteAssociateBorne.value.borne;
    if (id === idBorne) {
      this.clientService.dissocierBorne(this.client._id, id).subscribe(
        () => {
          const index = this.client.bornes.findIndex(borne => borne._id === id);
          this.client.bornes.splice(index, 1);
          this.toastr.clear();
          this.toastr.success('Succès', 'Borne dissociée');
          this.DeleteAssociateBorne.reset();
          // this.router.navigateByUrl('bornes');
        },
        (error) => {
          this.toastr.clear();
          this.toastr.error(`Error ${error}`);
        },
      );
    } else {
      this.DeleteAssociateBorne.reset();
      this.toastr.error('L \'id ne correspond pas');
    }
  }

  dissoOffer(id) {
    const idOffer = this.DeleteAssociateOffer.value.offer;
    if (id === idOffer) {
      this.clientService.dissocierOffer(this.client._id, id).subscribe(
        () => {
          const index = this.client.offer.findIndex(offer => offer._id === id);
          this.client.offer.splice(index, 1);
          this.toastr.clear();
          this.toastr.success('Succès', 'Offre dissociée');
          this.DeleteAssociateOffer.reset();
          // this.router.navigateByUrl('bornes');
        },
        (error) => {
          this.toastr.clear();
          this.toastr.error(`Error ${error}`);
        },
      );
    } else {
      this.DeleteAssociateOffer.reset();
      this.toastr.error('L \'id ne correspond pas');
    }
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
