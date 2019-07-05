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
import { UserService } from '../../../core/http/user.service';

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
    private userService: UserService,
    private modalService: NgbModal,
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
  public cannetteLabels = ['Cannette'];
  public cannetteType = 'doughnut';
  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';
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

  Form = this.fb.group({
    client: [''],
  });
  assoOfferForm = this.fb.group({
    offer: [''],
  });
  FormDelete = this.fb.group({
    borne: [''],
  });

  private;

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
  }

  getBorne() {
    this.borneService.getBorneById(this.id).subscribe(
      (borne: Borne) => {
        this.borne = borne;
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
      this.toastr.error('L \'id ne correspond pas');
    }
  }

  onSubmit() {
    this.clientService.getClientById(this.Form.value.client).pipe(first()).subscribe((client) => {
      const result = client.bornes.filter(bornes => bornes._id === this.id);
      if (result[0]) {
        this.toastr.error(`Ce client est déjà associée à cette borne`);
      } else {
        this.clientService.associateBorne(this.Form.value.client, this.borne._id).subscribe(
          () => {
            this.toastr.clear();
            this.toastr.success('Succès', 'Borne associée');
            // this.router.navigateByUrl('bornes');
          },
          (error) => {
            this.toastr.clear();
            this.toastr.error(`Error ${error}`);
          });
      }
    });
  }

  assoOffer() {
    const result = this.borne.offers.filter(offers => offers._id === this.assoOfferForm.value.offer);
    if (result[0]) {
      this.toastr.error(`Cette offre est déja associée`);
    } else {
      this.borneService.associateOffer(this.borne._id, this.assoOfferForm.value.offer).subscribe(
        () => {
          this.toastr.clear();
          this.toastr.success('Succès', 'Offre associée');
          // this.router.navigateByUrl('bornes');
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
    },                                                                                   (reason) => {
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

  disoOffer(id) {
    this.borneService.disocierOffer(this.borne._id, id).subscribe(
      () => {
        this.toastr.clear();
        this.toastr.success('Succès', 'Offre dissociée');
        // this.router.navigateByUrl('bornes');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      },
    );
  }
}
