import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BorneService } from '../../../core/http/borne.service';
import { Borne } from '../../../shared/models/borne';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-edit-borne',
  templateUrl: './edit-borne.component.html',
  styleUrls: ['./edit-borne.component.scss'],
})
export class EditBorneComponent implements OnInit {
  public id: string;
  public borne: Borne;

  constructor(
    public borneService: BorneService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    ) {
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
    this.route.paramMap.subscribe((id: ParamMap) => {
      this.id = id.get('id');
      if (this.id) {
        this.borneService.getBorneById(this.id).subscribe(
          (borne: Borne) => {
            this.borne = borne;
            this.borneForm.patchValue(borne);
          },
        );
      }
    });
  }
  onSubmit() {
    this.borneService.putBorn(this.id, this.borneForm.value).subscribe(
          (borne: Borne) => {
            this.borneForm.patchValue(borne);
            this.toastr.clear();
            this.toastr.success('success', 'Borne modifiè');
            this.router.navigateByUrl(`borne/${this.id}`);
          },
          (error) => {
            this.toastr.clear();
            this.toastr.error(`Error ${error}`);
          });
  }

}
