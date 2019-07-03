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
import {Borne} from '../../../shared/models/borne';

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
  public offer: Offer[];
  public borne: Borne;
  public id: string;
  public plastiqueData = [50];
  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';
  public cannetteData = [50];
  public cannetteLabels = ['Canette'];
  public cannetteType = 'doughnut';
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], labels: 'Serie A' },
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], labels: 'Serie B' },
  ];
  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService,
    public offerService: OffersService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private profileService: ProfileService,
    private borneService: BorneService,
    private modalService: NgbModal) { }

  assoOfferForm = this.fb.group({
    offer: [''],
  });
  FormDelete = this.fb.group({
    client: [''],
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getClient();
    });
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
    });
    this.offerService.getListOffers().pipe(first()).subscribe((offer) => {
      this.offer = offer;
    });
  }

  getClient() {
    this.clientService.getClientById(this.id).subscribe(
      (client: Client) => {
        this.client = client;
      },
    );
  }

  deleteClientModal() {
    const id = this.FormDelete.value.client;
    if (id === this.id) {
      this.clientService.getClientById(id).subscribe(
        (client: Client) => {
          if  (client) {
            this.clientService.deleteClient(client._id).subscribe();
            this.toastr.error('Suppression', 'client detroy');
            this.router.navigateByUrl(`clients`);
          }
        },
      );
    } else {
      this.toastr.error('L \'id ne correspond pas');
    }
  }
  deleteBorne(id) {
    const r = confirm('Etes VOUS sur');
    if (r) {
      this.borneService.deleteBorne(id).subscribe();
      this.toastr.error('Suppression', 'borne detroy');
      this.router.navigateByUrl(`bornes`);

    }
  }
  onSubmit() {
    const result = this.client.offer.filter(offers => offers._id === this.assoOfferForm.value.offer);
    if (result[0]) {
      this.toastr.error(`Cette offre déja associer`);
    } else {
      this.clientService.associateOffer(this.client._id, this.assoOfferForm.value.offer).subscribe(
        () => {
          this.toastr.clear();
          this.toastr.success('success', 'Offer associer');
          this.router.navigateByUrl('offers');
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }  if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    return  `with: ${reason}`;
  }
  desasoBorne(id) {
    this.clientService.desacosierBorne(this.client._id,id).subscribe(
      () => {
        this.toastr.clear();
        this.toastr.success('success', 'Borne desassocier');
        // this.router.navigateByUrl('bornes');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      }
    )
  }

}
