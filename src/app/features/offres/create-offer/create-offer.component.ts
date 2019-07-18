import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() selectOffer = new EventEmitter<Offer>();

  constructor(
    public service: OffersService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private profileService: ProfileService,
  ) { }

  offerForm = this.fb.group({
    surnom: [''],
    client: ['', [Validators.required]],
    remise: ['', [Validators.required]],
    contrat: this.fb.group({
      debut: ['', [Validators.required]],
      fin: [''],
    }),
    coupon: this.fb.group({
      total: ['', [Validators.required]],
      imprime: [0],
    }),
    details: ['', [Validators.maxLength(300)]],
  });

  ngOnInit() {
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
    });
  }

  onSubmit() {
    this.service.postOffer(this.offerForm.value).subscribe(
      (offer: Offer) => {
        this.selectOffer.emit(offer);
        this.toastr.clear();
        this.toastr.success('Succès', 'Offre créée');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      },
    );
  }
}
