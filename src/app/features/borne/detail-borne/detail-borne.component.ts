import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Borne } from '../../../shared/models/borne';

@Component({
  selector: 'app-detail-borne',
  templateUrl: './detail-borne.component.html',
  styleUrls: ['./detail-borne.component.scss'],
})
export class DetailBorneComponent implements OnInit {
  public borne: Borne;
  public id;

  constructor(private route: ActivatedRoute, public borneService: BorneService) { }

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

}
