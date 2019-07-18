import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Borne } from '../../../shared/models/borne';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../../core/http/profile.service';
import { User } from '../../../shared/models/user';
import { ModalDismissReasons, NgbModal, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../core/http/client.service';
import { Client } from '../../../shared/models/client-model';
import { FormBuilder } from '@angular/forms';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';
import { DataService } from 'src/app/core/http/data.service';
import { Data } from 'src/app/shared/models/data.model';

@Component({
  selector: 'app-detail-borne',
  templateUrl: './detail-borne.component.html',
  styleUrls: ['./detail-borne.component.scss'],
})
export class DetailBorneComponent implements OnInit {

  constructor(
    config: NgbTabsetConfig,
    private route: ActivatedRoute,
    public borneService: BorneService,
    public clientService: ClientService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private offerService: OffersService,
    private modalService: NgbModal,
    public dataService: DataService,
  ) {
    config.justify = 'center';
    config.type = 'pills';
  }
  public closeResult: string;
  public bornes: Borne[];
  public borne: Borne;
  public user: User;
  public check: any;
  public client: Client[];
  public offers: Offer[];
  public id: string;
  public idHidden: boolean;

  // Doughnut chart data
  public metalLabels = ['Métal', 'Vide'];
  public metalType = 'doughnut';
  public plastiqueLabels = ['Plastique', 'Vide'];
  public plastiqueType = 'doughnut';
  public rouleauLabels = ['Utilisé', 'Restant'];
  public rouleauType = 'doughnut';

  // Bar chart general options
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartType = 'bar';
  public barChartLegend = true;

  // Bar chart days data
  public days = true;
  public barChartLabelsDays = [];
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

  // Bar chart week data
  public weeks = false;
  public barChartLabelsWeeks = [];
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

  // Bar chart months data
  public months = false;
  public barChartLabelsMonths = [];
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

  public plastiqueColor =
    [
      {
        backgroundColor: ['rgb(65,105,225,0.6)', 'rgb(102, 102, 102, 0.4)'],
        borderColor: ['rgb(65,105,225,1)', 'transparent'],
      },
    ];

  public metalColor =
    [
      {
        backgroundColor: ['rgb(160,82,45,0.6)', 'rgb(102, 102, 102, 0.4)'],
        borderColor: ['rgba(160,82,45,1)', 'transparent'],
      },
    ];

  public couponColor =
    [
      {
        backgroundColor: ['rgb(225, 65, 65, 0.6)', 'rgb(102, 102, 102, 0.4)'],
        borderColor: ['rgba(225, 65, 65,1)', 'transparent'],
      },
    ];

  Form = this.fb.group({
    client: [''],
  });
  assoOfferForm = this.fb.group({
    offer: [''],
  });
  FormDelete = this.fb.group({
    borne: [''],
  });
  FormDeleteAssociate = this.fb.group({
    offer: [''],
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getBorne();
    });
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
    });
    this.clientService.getListClient().pipe(first()).subscribe((client) => {
      this.client = client;
    });
    this.offerService.getListOffers().pipe(first()).subscribe((offer) => {
      this.offers = offer;
    });
    this.getDatas();
  }

  hiddenButton() {
    this.idHidden = !this.idHidden;
  }

  getBorne() {
    this.borneService.getBorneById(this.id).subscribe(
      (borne: Borne) => {
        this.borne = borne;
      },
    );
  }

  getDatas() {
    this.dataService.getBorneDataByDay(this.id).subscribe(
      (dataDay: Data[]) => {
        dataDay.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
        // tslint:disable-next-line: ter-arrow-parens
        dataDay.map(data => {
          this.barChartDataDays[0].data.push(data.plastique);
          this.barChartDataDays[1].data.push(data.metal);
          this.barChartLabelsDays.push(new Date(data.date).toDateString());
        });
      },
    );
    this.dataService.getBorneDataByWeek(this.id).subscribe(
      (dataWeek: Data[]) => {
        dataWeek.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
        // tslint:disable-next-line: ter-arrow-parens
        dataWeek.map(data => {
          this.barChartDataWeeks[0].data.push(data.plastique);
          this.barChartDataWeeks[1].data.push(data.metal);
          this.barChartLabelsWeeks.push(new Date(data.date).toDateString());
        });
      },
    );
    this.dataService.getBorneDataByMonth(this.id).subscribe(
      (dataMonth: Data[]) => {
        dataMonth.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
        // tslint:disable-next-line: ter-arrow-parens
        dataMonth.map(data => {
          this.barChartDataMonths[0].data.push(data.plastique);
          this.barChartDataMonths[1].data.push(data.metal);
          this.barChartLabelsMonths.push(new Date(data.date).toDateString());
        });
      },
    );
  }

  deleteBorneModal() {
    const id = this.FormDelete.value.borne;
    if (id === this.id) {
      this.borneService.getBorneById(id).subscribe(
        (borne: Borne) => {
          if (borne) {
            this.borneService.deleteBorne(borne._id).subscribe();
            this.toastr.error('Suppression', 'Borne supprimée');
            this.router.navigateByUrl(`bornes`);
          }
        },
      );
    } else {
      this.FormDelete.reset();
      this.toastr.error('L \'id ne correspond pas');
    }
  }

  tauxRouleau(couponsRestants) {
    return Math.round((350 - couponsRestants) / 3.5);
  }

  color(taux: number) {
    if (taux >= 90) {
      return 'danger';
    } if (taux >= 65) {
      return 'warning';
    }
    return 'success';
  }

  onSubmit() {
    this.borneService.getBorneById(this.borne._id).pipe(first()).subscribe((borne) => {
      this.borneService.associateClient(this.Form.value.client, this.borne._id).subscribe(
        () => {
          this.toastr.clear();
          this.toastr.success('Succès', 'Borne associée');
        },
        (error) => {
          this.toastr.clear();
          this.toastr.error(`Error ${error}`);
        });
    });
  }

  assoOffer() {
    const result = this.borne.offers.filter(offers => offers._id === this.assoOfferForm.value.offer);
    if (result[0]) {
      this.toastr.error(`Cette offre est déja associée à cette borne`);
    } else {
      this.borneService.associateOffer(this.borne._id, this.assoOfferForm.value.offer).subscribe(
        () => {
          this.offerService.getOffer(this.assoOfferForm.value.offer).pipe(first()).subscribe((offer) => {
            const offre = this.borne.offers.filter(offers => offers._id === offer._id);
            if (offre.length >= 1) {
              this.toastr.error(`Error deja associée`);
            } else {
              this.borne.offers.push(offer);
            }
          });
          this.toastr.clear();
          this.toastr.success('Succès', 'Offre associée');
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
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    return `with: ${reason}`;
  }

  dissoOffer(id) {
    const idBorne = this.FormDeleteAssociate.value.offer;
    if (id === idBorne) {
      this.borneService.dissocierOffer(this.borne._id, id).subscribe(
        () => {
          const index = this.borne.offers.findIndex(offer => offer._id === id);
          this.borne.offers.splice(index, 1);
          this.toastr.clear();
          this.toastr.success('Succès', 'Offre dissociée');
          this.FormDeleteAssociate.reset();
        },
        (error) => {
          this.toastr.clear();
          this.toastr.error(`Error ${error}`);
        },
      );
    } else {
      this.FormDeleteAssociate.reset();
      this.toastr.error('L \'id ne correspond pas');
    }
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
