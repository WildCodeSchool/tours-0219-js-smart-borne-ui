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

  constructor(public borneService: BorneService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private profileService: ProfileService) {
  }

  borneForm = this.fb.group({
    numeroSerie: ['', [Validators.required]],
    address: this.fb.group({
      rue: ['', [Validators.required]],
      codePostal: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      numero: ['', [Validators.required]],
    }),
    dateInstallation: ['', [Validators.required]],
    styliseeClient: ['', [Validators.required]],
    details: ['', [Validators.maxLength(300)]],
    taux: this.fb.group({
      bacUn: [0],
      bacDeux: [0],
    }),
    coupons: this.fb.group({
      restant: [0],
      imprimer: [0],
    }),
    total: this.fb.group({
      recycle: [0],
      remise: [0],
      cannettes: [0],
      plastique: [0],
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
          this.toastr.clear();
          this.toastr.success('success', 'Borne Created');
          this.router.navigateByUrl('bornes');
        },
        (error) => {
          this.toastr.clear();
          this.toastr.error(`Error ${error}`);
        });
  }

}
