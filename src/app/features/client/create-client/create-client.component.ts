import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Client } from '../../../shared/models/client-model';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../core/http/client.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../../core/http/profile.service';
import { User } from '../../../shared/models/user';
import { Borne } from '../../../shared/models/borne';
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  public clients: Client[];
  public clientForm: FormGroup;
  public user: User;

  @Output() selectClient = new EventEmitter<Client>();

  constructor(
    private fb: FormBuilder,
    public clientService: ClientService,
    private router: Router,
    private toastr: ToastrService,
    private profileService: ProfileService,
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
        fin: [''],
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
        total: [0],
        imprimer: [0],
        restant: [0],
      }),
    });
  }
  ngOnInit() {
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
    });
  }

  onSubmit() {
    this.clientService.postClient(this.clientForm.value).subscribe(
      (client: Client) => {
        this.selectClient.emit(client);
        this.toastr.clear();
        this.toastr.success('Succès', 'Client ajouté');
      },

      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      },
    );
  }
}
