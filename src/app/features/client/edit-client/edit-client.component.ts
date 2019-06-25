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
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  public id: string;
  public client: Client;
  public clientForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public clientService: ClientService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.clientForm = this.fb.group({
      siret: ['', [Validators.required]],
      raisonSocial: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: this.fb.group({
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
      coupon: [0]
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((id: ParamMap) => {
      this.id = id.get('id');
      if (this.id) {
        this.clientService.getClientById(this.id).subscribe(
          (client: Client) => {
            this.client = client;
            this.clientForm.patchValue(client);
          },
        );
      }
    });
  }
  onSubmit() {
    this.clientService.putClient(this.id, this.clientForm.value).subscribe(
      (client: Client) => {
        this.clientForm.patchValue(client);
        this.toastr.clear();
        this.toastr.success('success', 'Client modifiè');
        this.router.navigateByUrl(`client/${this.id}`);
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      });
  }

}
