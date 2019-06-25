import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public plastiqueData = [50];
  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';

  public cannetteData = [50];
  public cannetteLabels = ['Canette'];
  public cannetteType = 'doughnut';
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = ['janvier', 'fevrier', 'mars', 'avril', 'mai',
    'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], labels: 'Serie A' },
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], labels: 'Serie B' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
