import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss'],
})
export class EditOfferComponent implements OnInit {

  public id: string;
  public offer: Offer;

  constructor(
    public service: OffersService,
    private fb: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  offerForm = this.fb.group({
    name: [''],
    client: ['', [Validators.required]],
    remise: ['', [Validators.required]],
    details: ['', [Validators.maxLength(300)]],
    debutOffre: ['', [Validators.required]],
    couponsRestants: ['', [Validators.required]],
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.id = id;
      if (id) {
        this.service.getOffer(id).subscribe(
          (offer: Offer) => {
            this.offer = offer;
            this.offerForm.patchValue(offer);
          });
      }
    });
  }

  onSubmit() {
    this.service.putOffer(this.id, this.offerForm.value).subscribe(
      (offer: Offer) => {
        this.offerForm.patchValue(offer);
        this.toastr.clear();
        this.toastr.success('success', 'Offer updated');
        this.router.navigateByUrl(`offre/${this.id}`);
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      },
    );
  }
}
