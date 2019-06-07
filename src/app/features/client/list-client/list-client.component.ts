import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/models/clients-models';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClientService } from '../../../core/http/client.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit {
  public client: Client[];
  public clientForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public clientService: ClientService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.clientForm = this.fb.group({
      siret: ['', [Validators.required]],
      raisonSocial: [''],
      name: [''],
      address : this.fb.group({
        numero: [''],
        nomRue: [''],
        departement: [''],
        ville: [''],
      }),
      contrat: this.fb.group({
        debut: [''],
        fin: [''],
      }),
      siege: this.fb.group({
        email: [''],
        telephone: [''],
      }),
      gerant: this.fb.group({
        name: [''],
        email: [''],
        telephone: [''],
      }),
      coupon: this.fb.group({
        total: [''],
        imprimer: [''],
        restant: [''],
      }),
    });
  }
  ngOnInit() {
    this.getListClient();
  }
  getListClient() {
    this.clientService.getListClient().subscribe((client: Client[]) => {
      this.client = client;
    });
  }
  onSubmit() {
    this.clientService.postClient(this.clientForm.value).subscribe(
      (client: Client) => {
        this.clientForm.patchValue(client);
        this.toastr.clear();
        this.toastr.success('success', 'Client Ajoute');
        this.router.navigateByUrl('/');
      },
// tslint:disable-next-line: ter-arrow-parens
      error => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      },
    );
  }
}
