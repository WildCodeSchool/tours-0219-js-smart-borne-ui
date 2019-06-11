import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
