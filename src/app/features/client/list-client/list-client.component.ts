import { Component, OnInit } from '@angular/core';
import { Clients } from '../../../shared/models/clients-models';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClientService } from '../../../core/http/client.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],

})
export class ListClientComponent implements OnInit {
  public client: Clients;
  public clientForm: FormGroup;
  constructor(private fb: FormBuilder,
              public clientService: ClientService,
              private router: Router,
              private toastr: ToastrService) {

    this.clientForm = this.fb.group({
      siret: ['',[Validators.required]],
      raisonSocial: ['',[Validators.required]],
      name: ['',[Validators.required]],
      ville: ['',[Validators.required]],
      debutContrat: [''],
      finContrat: [''],
      address: [''],
      emailSiege: [''],
      emailGerant: [''],
      telephoneSiege: [''],
      telephoneGerrant: [''],
      nombreTotalCouponImprimes: [''],

    });

  }
  ngOnInit() {
    this.getListClient();
  }
  getListClient(){
    this.clientService.getListClient().subscribe(
      (param: Clients) => {
        this.client = param;
      }
    )
  }
  onSubmit(){
    this.clientService.postClient(
      this.clientForm.value).subscribe(
        (client: Clients) => {
          this.clientForm.patchValue(client);
          this.toastr.clear();
          this.toastr.success('success', 'Client Ajoute');
          this.router.navigateByUrl('/');

        },
        (error)=> {
          this.toastr.clear();
          this.toastr.error(`Error ${error}`)
        }
      )
  }

}
