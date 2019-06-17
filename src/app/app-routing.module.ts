import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOffersComponent } from './features/offres/list-offers/list-offers.component';
import { CardOfferComponent } from './shared/components/card-offer/card-offer.component';
import { CreateOfferComponent } from './features/offres/create-offer/create-offer.component';
import { ListClientComponent } from './features/client/list-client/list-client.component';
import { ListBorneComponent } from './features/borne/list-borne/list-borne.component';
import { DetailBorneComponent } from './features/borne/detail-borne/detail-borne.component';
import { EditBorneComponent } from './features/borne/edit-borne/edit-borne.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HeaderComponent } from './core/header/header.component';
import { ListUserComponent } from './features/user/list-user/list-user.component';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';
import { DetailClientComponent } from './features/client/detail-client/detail-client.component';
import { EditClientComponent } from './features/client/edit-client/edit-client.component';
import { DetailOfferComponent } from './features/offres/detail-offer/detail-offer.component';
import { EditOfferComponent } from './features/offres/edit-offer/edit-offer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path:  '',
    component:  HeaderComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'bornes', component: ListBorneComponent },
      { path: 'borne/:id', component: DetailBorneComponent },
      { path: 'borne/:id/edit', component: EditBorneComponent },
      { path: 'dashboard/user', component: ListUserComponent },
      { path: 'dashboard/user/:id/edit', component: EditUserComponent },
      { path: 'clients', component: ListClientComponent },
      { path: 'client/:id', component: DetailClientComponent },
      { path: 'client/:id/edit', component: EditClientComponent },
      { path: 'clients/detail', component: DetailClientComponent },
      { path: 'offres', component: ListOffersComponent },
      { path: 'cards', component: CardOfferComponent },
      { path: 'offres/create', component: CreateOfferComponent },
      { path: 'offre/:id', component: DetailOfferComponent },
      { path: 'offre/:id/edit', component: EditOfferComponent },
    ]},
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
