import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
})
export class CreateOfferComponent implements OnInit {
  public id;
  public offer;
  constructor(
    public service: OffersService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  offerForm = this.fb.group({
    name: [''],
    id: ['', [Validators.required]],
    client: ['', [Validators.required]],
    remise: ['', [Validators.required]],
    details: ['', [Validators.maxLength(300)]],
    debutOffre: ['', [Validators.required]],
    couponsRestants: ['', [Validators.required]],
  });

  ngOnInit() { }

  onSubmit() {
    this.service.postOffer(this.offerForm.value).subscribe(
      (offer: Offer) => {
        this.offerForm.patchValue(offer);
        this.toastr.clear();
        this.toastr.success('success', 'Offer Created');
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      },
    );
  }
}