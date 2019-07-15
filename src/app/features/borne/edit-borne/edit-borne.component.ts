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
      rue: [''],
      codePostal: [''],
      ville: [''],
      numero: [''],
    }),
    dateInstallation: ['', [Validators.required]],
    details: ['', [Validators.maxLength(300)]],
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
            this.toastr.success('Succès', 'Borne modifiée');
            this.router.navigateByUrl(`borne/${this.id}`);
          },
          (error) => {
            this.toastr.clear();
            this.toastr.error(`Error ${error}`);
          });
  }

}
