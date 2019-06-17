import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { FilterBornePipe } from './pipes/filter-borne.pipe';
import { FilterClientPipe } from './pipes/filter-client.pipe';

@NgModule({
  declarations: [FilterUserPipe, FilterBornePipe, FilterClientPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    FilterUserPipe,
    FilterBornePipe,
    FilterClientPipe,
  ],
})
export class SharedModule { }
