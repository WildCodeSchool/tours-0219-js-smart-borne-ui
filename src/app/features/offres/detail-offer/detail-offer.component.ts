import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Offer } from '../../../shared/models/offres.models';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../../core/http/profile.service';
import { User } from '../../../shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.scss'],
})
export class DetailOfferComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public offerService: OffersService,
              private profileService: ProfileService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private fb: FormBuilder) { }
  public closeResult: string;
  public offer: Offer;
  public user: User;
  public id: string;
  public couponsData = [];
  public couponsLabels = ['Coupons imprimés', 'Coupons restants'];
  public couponsType = 'doughnut';

  FormDelete = this.fb.group({
    offer: [''],
  });

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
        this.couponsData.push(this.offer.coupon.imprime);
        this.couponsData.push(this.offer.coupon.total);
      },
    );
  }

  deleteOfferModal() {
    const id = this.FormDelete.value.offer;
    if (id === this.id) {
      this.offerService.getOffer(id).subscribe(
        (offer: Offer) => {
          if  (offer) {
            // this.offerService.deleteOffer(offer._id).subscribe();
            this.toastr.error('Suppression', 'offer detroy');
            this.router.navigateByUrl(`offers`);
          }
        },
      );
    } else {
      this.toastr.error('L \'id ne correspond pas');
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
}
