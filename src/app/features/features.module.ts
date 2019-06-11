import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListBorneComponent } from './borne/list-borne/list-borne.component';
import { DetailBorneComponent } from './borne/detail-borne/detail-borne.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditBorneComponent } from './borne/edit-borne/edit-borne.component';
import { CreateBorneComponent } from './borne/create-borne/create-borne.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ListBorneComponent,
    DetailBorneComponent,
    EditBorneComponent,
    CreateBorneComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    NgbModule,
  ],
})
export class FeaturesModule { }
