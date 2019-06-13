import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss'],
})
export class DetailClientComponent implements OnInit {

  public plastiqueData = [50];
  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';

  public cannetteData = [50];
  public cannetteLabels = ['Canette'];
  public cannetteType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
