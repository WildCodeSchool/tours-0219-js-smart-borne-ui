import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/models/client-model';
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
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  public clients: Client[];
  public clientForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public clientService: ClientService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.clientForm = this.fb.group({
      siret: ['', [Validators.required]],
      raisonSocial: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address : this.fb.group({
        numero: ['', [Validators.required]],
        nomRue: ['', [Validators.required]],
        departement: ['', [Validators.required]],
        ville: ['', [Validators.required]],
      }),
      contrat: this.fb.group({
        debut: ['', [Validators.required]],
        fin: ['', [Validators.required]],
      }),
      siege: this.fb.group({
        email: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
      }),
      gerant: this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
      }),
      coupon: this.fb.group({
        total: ['', [Validators.required]],
        imprimer: ['', [Validators.required]],
        restant: ['', [Validators.required]],
      }),
    });
  }
  ngOnInit() {
    this.getListClient();
  }
  getListClient() {
    this.clientService.getListClient().subscribe((client: Client[]) => {
      this.clients = client;
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
