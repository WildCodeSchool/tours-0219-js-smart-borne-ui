import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListClientComponent } from './client/list-client/list-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CreateClientComponent } from './client/create-client/create-client.component';

@NgModule({
  declarations: [ListClientComponent, CreateClientComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
