import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Borne } from '../../../shared/models/borne';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../../core/http/profile.service';
import { User } from '../../../shared/models/user';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-borne',
  templateUrl: './detail-borne.component.html',
  styleUrls: ['./detail-borne.component.scss'],
})
export class DetailBorneComponent implements OnInit {
  public bornes: Borne[];
  public borne: Borne;
  public user: User;
  public id: string;
  public jourLabels = ['Plastique, Cannette, Coupon'];
  public jourType = 'doughnut';
  public semaineLabels = ['Plastique, Cannette, Coupon'];
  public semaineType = 'doughnut';
  public moisLabels = ['Plastique, Cannette, Coupon'];
  public moisType = 'doughnut';

  constructor(
    config: NgbTabsetConfig,
    private route: ActivatedRoute,
    public borneService: BorneService,
    private toastr: ToastrService,
    private router: Router,
    private profileService: ProfileService
  ) {
    config.justify = 'center';
    config.type = 'pills';
  }

  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';

  public cannetteLabels = ['Canette'];
  public cannetteType = 'doughnut';
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getBorne();
    });
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
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

}
