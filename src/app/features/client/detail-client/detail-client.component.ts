import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Client } from '../../../shared/models/client-model';
import { ClientService } from '../../../core/http/client.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss'],
})
export class DetailClientComponent implements OnInit {
  public clients: Client[];
  public client: Client;
  public id: string;
  public plastiqueData = [50];
  public plastiqueLabels = ['Plastique'];
  public plastiqueType = 'doughnut';
  public cannetteData = [50];
  public cannetteLabels = ['Canette'];
  public cannetteType = 'doughnut';

  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getClient();
    });
  }
  getClient() {
    this.clientService.getClientById(this.id).subscribe(
      (client: Client) => {
        this.client = client;
      },
    );
  }

  deleteClient(id) {
    const r = confirm('Etes VOUS sur');
    if (r) {
      this.clientService.deleteClient(id).subscribe();
      this.toastr.error('Suppression', 'client detroy');
      this.router.navigateByUrl(`clients`);

    }

  }

}
