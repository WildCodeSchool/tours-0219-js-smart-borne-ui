import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Borne } from '../../../shared/models/borne';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../../core/http/profile.service';
import { User } from '../../../shared/models/user';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../core/http/client.service';
import { Client } from '../../../shared/models/client-model';
import { FormBuilder } from '@angular/forms';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';

@Component({
  selector: 'app-detail-borne',
  templateUrl: './detail-borne.component.html',
  styleUrls: ['./detail-borne.component.scss'],
})
export class DetailBorneComponent implements OnInit {
  public bornes: Borne[];
  public borne: Borne;
  public user: User;
  public client: Client[];
  public offers: Offer[];
  public id: string;
  public cannetteLabels = ['Cannette'];
  public cannetteType = 'doughnut';
  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';
  

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
  ) {
    config.justify = 'center';
    config.type = 'pills';
  }

  Form = this.fb.group({
    client: [''],
  });
  assoOfferForm = this.fb.group({
    offer: [''],
  })
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

  deleteBorne(id) {
    const r = confirm('Etes VOUS sur');
    if (r) {
      this.borneService.deleteBorne(id).subscribe();
      this.toastr.error('Suppression', 'borne detroy');
      this.router.navigateByUrl(`bornes`);

    }
  }

  onSubmit() {
    this.borneService.associateBorne(this.Form.value.client, this.borne._id).subscribe(
      () => {
        this.toastr.clear();
        this.toastr.success('success', 'Borne associer');
        this.router.navigateByUrl('bornes');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      });
  }

  assoOffer() {
    this.borneService.associateOffer(this.borne._id, this.assoOfferForm.value.offer).subscribe(
      () => {
        this.toastr.clear();
        this.toastr.success('success', 'Offre associer');
        this.router.navigateByUrl('bornes');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      });
  }

}
