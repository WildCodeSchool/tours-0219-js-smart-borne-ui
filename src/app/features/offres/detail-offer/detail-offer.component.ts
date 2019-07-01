import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Offer } from '../../../shared/models/offres.models';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../../core/http/profile.service';
import { User } from '../../../shared/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.scss'],
})
export class DetailOfferComponent implements OnInit {
  public offer: Offer;
  public user: User;
  public id: string;
  public couponsData = [50];
  public couponsLabels = ['Coupons imprimés'];
  public couponsType = 'doughnut';

  constructor(private route: ActivatedRoute,
              public offerService: OffersService,
              private profileService: ProfileService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getOffer();
    });
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
    });
  }

  getOffer() {
    this.offerService.getOffer(this.id).subscribe(
      (offer: Offer) => {
        this.offer = offer;
      },
    );
  }
  deleteOffer(id) {
    const r = confirm('Etes VOUS sur');
    if (r) {
      this.offerService.deleteOffer(id).subscribe();
      this.toastr.error('Suppression', 'Offre detroy');
      this.router.navigateByUrl(`offer`);

    }

  }
}
