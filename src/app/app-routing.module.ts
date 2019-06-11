import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOffersComponent } from './features/list-offers/list-offers.component';
import { CardOfferComponent } from './shared/components/card-offer/card-offer.component';
import { CreateOfferComponent } from './features/create-offer/create-offer.component';
const routes: Routes = [
  { path: '', component: ListOffersComponent },
  { path: 'cards', component: CardOfferComponent },
  { path: 'create', component: CreateOfferComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
