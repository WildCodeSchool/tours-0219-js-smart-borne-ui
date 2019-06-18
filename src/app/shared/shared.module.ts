import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { FilterBornePipe } from './pipes/filter-borne.pipe';
import { FilterClientPipe } from './pipes/filter-client.pipe';
import { FilterOfferPipe } from './pipes/filter-offer.pipe';

@NgModule({
  declarations: [FilterUserPipe, FilterBornePipe, FilterClientPipe, FilterOfferPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    FilterUserPipe,
    FilterBornePipe,
    FilterClientPipe,
    FilterOfferPipe,
  ],
})
export class SharedModule { }
