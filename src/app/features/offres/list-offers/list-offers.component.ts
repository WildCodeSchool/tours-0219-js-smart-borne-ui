import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../core/http/offers.service';
import { Offer } from '../../../shared/models/offres.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss'],
})
export class ListOffersComponent implements OnInit {
  public offers: Offer[];
  public filterId: string;
  public filterClient: string;
  public filterRemise: string;
  public filterDebut: string;
  public filterFin: string;

  constructor(public offersService: OffersService,
              private route: ActivatedRoute,
              public router: Router,
              private fb: FormBuilder) {
  }

  queryForm = this.fb.group({
    query: ['', [Validators.required]],
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.client) {
        this.offersService.getQueryOffer(params.client).subscribe((client) => {
          this.offers = client;
        });
      } else {
        this.getListOffers();
      }
    });
  }

  getListOffers() {
    this.offersService.getListOffers().subscribe((offers: Offer[]) => {
      this.offers = offers;
    });
  }

  onSubmit() {
    this.router.navigate(['/offers'], {
      queryParams: { client:  this.queryForm.value.query } });
  }
}
