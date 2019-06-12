import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateOfferComponent } from './offres/create-offer/create-offer.component';
import { DetailOfferComponent } from './offres/detail-offer/detail-offer.component';
import { EditOfferComponent } from './offres/edit-offer/edit-offer.component';
import { ListOffersComponent } from './offres/list-offers/list-offers.component';
import { CardOfferComponent } from '../shared/components/card-offer/card-offer.component';
import { HttpModule } from '@angular/http';
import { ListClientComponent } from './client/list-client/list-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { HomeComponent } from './home/home.component';
import { DetailClientComponent } from './client/detail-client/detail-client.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListBorneComponent } from './borne/list-borne/list-borne.component';
import { DetailBorneComponent } from './borne/detail-borne/detail-borne.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EditBorneComponent } from './borne/edit-borne/edit-borne.component';
import { CreateBorneComponent } from './borne/create-borne/create-borne.component';

@NgModule({
  declarations: [
    CreateOfferComponent,
    DetailOfferComponent,
    EditOfferComponent,
    ListOffersComponent,
    CardOfferComponent,
    ListClientComponent,
    CreateClientComponent,
    HomeComponent,
    DetailClientComponent,
    ListBorneComponent,
    DetailBorneComponent,
    EditBorneComponent,
    CreateBorneComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
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
