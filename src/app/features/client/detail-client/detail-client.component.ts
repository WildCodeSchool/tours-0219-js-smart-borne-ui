import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/models/client-model';
import { ClientService } from '../../../core/http/client.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../../core/http/profile.service';
import { User } from '../../../shared/models/user';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss'],
})
export class DetailClientComponent implements OnInit {
  public clients: Client[];
  public client: Client;
  public user: User;
  public offer: Offer[];
  public id: string;
  public plastiqueData = [50];
  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';
  public cannetteData = [50];
  public cannetteLabels = ['Canette'];
  public cannetteType = 'doughnut';

  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService,
    public offerService: OffersService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private profileService: ProfileService) { }

    assoOfferForm = this.fb.group({
      offer: [''],
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

  deleteClient(id) {
    const r = confirm('Etes VOUS sur');
    if (r) {
      this.clientService.deleteClient(id).subscribe();
      this.toastr.error('Suppression', 'client detroy');
      this.router.navigateByUrl(`clients`);
    }
  }

  onSubmit() {
    this.clientService.associateOffer(this.client._id, this.assoOfferForm.value.offer).subscribe(
      () => {
        this.toastr.clear();
        this.toastr.success('success', 'Offer associer');
        this.router.navigateByUrl('offer');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      });
  }

}
