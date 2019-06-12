import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOffersComponent } from './features/offres/list-offers/list-offers.component';
import { CardOfferComponent } from './shared/components/card-offer/card-offer.component';
import { CreateOfferComponent } from './features/offres/create-offer/create-offer.component';
import { ListClientComponent } from './features/client/list-client/list-client.component';
import { HomeComponent } from './features/home/home.component';
import { ListBorneComponent } from './features/borne/list-borne/list-borne.component';
import { DetailBorneComponent } from './features/borne/detail-borne/detail-borne.component';
import { EditBorneComponent } from './features/borne/edit-borne/edit-borne.component';
import { EditOfferComponent } from './features/offres/edit-offer/edit-offer.component';
import { DetailOfferComponent } from './features/offres/detail-offer/detail-offer.component';

const routes: Routes = [
  { path: '', component: ListClientComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bornes', component: ListBorneComponent },
  { path: 'borne/:id', component: DetailBorneComponent },
  { path: 'borne/:id/edit', component: EditBorneComponent },
  { path: 'offres', component: ListOffersComponent },
  { path: 'cards', component: CardOfferComponent },
  { path: 'offres/create', component: CreateOfferComponent },
  { path: 'offre/:id', component: DetailOfferComponent },
  { path: 'offre/:id/edit', component: EditOfferComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
