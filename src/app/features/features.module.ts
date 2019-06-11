import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { DetailOfferComponent } from './detail-offer/detail-offer.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { ToastrModule } from 'ngx-toastr';
import { ListOffersComponent } from './list-offers/list-offers.component';
import { CardOfferComponent } from '../shared/components/card-offer/card-offer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CreateOfferComponent,
    DetailOfferComponent,
    EditOfferComponent,
    ListOffersComponent,
    CardOfferComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    HttpModule,
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
export class FeaturesModule {}
