import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { Borne } from '../../../shared/models/borne';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-borne',
  templateUrl: './list-borne.component.html',
  styleUrls: ['./list-borne.component.scss'],
})
export class ListBorneComponent implements OnInit {
  public borne: Borne;
  constructor(public borneService: BorneService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {
  }

  borneForm = this.fb.group({
    ville: ['', [Validators.required]],
    numerodeSerie: ['', [Validators.required]],
    raisonSociale: ['', [Validators.required]],
    numeroEtNomDeRue: ['', [Validators.required]],
    dateInstallation: ['', [Validators.required]],
    styliseeClient: ['', [Validators.required]],
    details: ['', [Validators.required]],
  });

  ngOnInit() {
    this.getListBorne();
  }

  getListBorne() {
    this.borneService.getListBorne().subscribe(
      (param: Borne) => {
        this.borne = param;
      },
    );
  }

  onSubmit() {
    this.borneService.postBorne(
      this.borneForm.value).subscribe(
      (borne: Borne) => {
        this.borneForm.patchValue(borne);
        this.toastr.clear();
        this.toastr.success('success', 'Borne Created');
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error(`Error ${error}`);
      });
  }

}
