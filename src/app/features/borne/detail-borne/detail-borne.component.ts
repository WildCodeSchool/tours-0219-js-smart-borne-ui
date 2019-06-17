import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Borne } from '../../../shared/models/borne';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-borne',
  templateUrl: './detail-borne.component.html',
  styleUrls: ['./detail-borne.component.scss'],
})
export class DetailBorneComponent implements OnInit {
  public bornes: Borne[];
  public borne: Borne;
  public id: string;

  constructor(
    private route: ActivatedRoute,
    public borneService: BorneService,
    private toastr: ToastrService,
    private router: Router) { }

  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';


  public cannetteLabels = ['Canette'];
  public cannetteType = 'doughnut';
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getBorne();
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
