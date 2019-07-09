import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { Borne } from '../../../shared/models/borne';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/models/user';
import { ProfileService } from '../../../core/http/profile.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-borne',
  templateUrl: './create-borne.component.html',
  styleUrls: ['./create-borne.component.scss'],
})
export class CreateBorneComponent implements OnInit {
  public user: User;
  public bornes: Borne[];

  constructor(public borneService: BorneService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private profileService: ProfileService) {
  }

  borneForm = this.fb.group({
    numeroSerie: ['', [Validators.required]],
    address: this.fb.group({
      rue: [''],
      codePostal: [''],
      ville: [''],
      numero: [''],
    }),
    dateInstallation: ['', [Validators.required]],
    client: [''],
    details: ['', [Validators.maxLength(300)]],
    coupon: this.fb.group({
      restant: [0],
      imprimer: [0],
    }),
    plastique: this.fb.group({
      taux: [0],
      total: [0],
    }),
    metal: this.fb.group({
      taux: [0],
      total: [0],
    }),
    total: this.fb.group({
      recycle: [0],
      remise: [0],
      coupons: [0],
    }),
    problemesTechniques: ['0'],
  });

  ngOnInit() {
    this.profileService.getProfile().pipe(first()).subscribe((users) => {
      this.user = users;
    });
  }

  onSubmit() {
    this.borneService.postBorne(
      this.borneForm.value).subscribe(
        (borne: Borne) => {
          this.borneForm.patchValue(borne);
          this.borneForm.reset();
          this.toastr.clear();
          this.toastr.success('Succès', 'Borne créée');
          this.router.navigateByUrl('bornes');
        },
        (error) => {
          this.borneForm.reset();
          this.toastr.clear();
          this.toastr.error(`Error ${error}`);
        });
  }

}
