import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { ProfileService } from 'src/app/core/http/profile.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
})
export class CreateOfferComponent implements OnInit {
  public id;
  public offer;
  public user: User;
  constructor(
    public service: OffersService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private profileService: ProfileService,
  ) { }

  offerForm = this.fb.group({
    surnom: ['', [Validators.required]],
    client: ['', [Validators.required]],
    remise: ['', [Validators.required]],
    contrat: this.fb.group({
      debut: ['', [Validators.required]],
      fin: ['', [Validators.required]],
    }),
    coupon: this.fb.group({
      total: ['', [Validators.required]],
      imprime: [0],
    }),
  });

  ngOnInit() {
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
    });
  }

  onSubmit() {
    this.service.postOffer(this.offerForm.value).subscribe(
      (offer: Offer) => {
        this.offerForm.patchValue(offer);
        this.toastr.clear();
        this.toastr.success('success', 'Offer Created');
        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      },
    );
  }
}
