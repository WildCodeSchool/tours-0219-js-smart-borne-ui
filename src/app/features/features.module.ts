import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListClientComponent } from './client/list-client/list-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CreateClientComponent } from './client/create-client/create-client.component';

import { DetailClientComponent } from './client/detail-client/detail-client.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [ListClientComponent, CreateClientComponent, DetailClientComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    ChartsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
})
export class FeaturesModule { }
