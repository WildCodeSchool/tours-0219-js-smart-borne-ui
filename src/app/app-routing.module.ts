import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOffersComponent } from './features/offres/list-offers/list-offers.component';
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
import { RoleGuard } from './core/guards/role.guard';
import { DetailOfferComponent } from './features/offres/detail-offer/detail-offer.component';
import { EditOfferComponent } from './features/offres/edit-offer/edit-offer.component';
import { MaintenanceComponent } from './features/maintenance/maintenance.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'register', component: RegisterComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ADMINISTRATEUR',
        },
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'maintenance', component: MaintenanceComponent },
      { path: 'bornes', component: ListBorneComponent },
      { path: 'borne/:id', component: DetailBorneComponent },
      {
        path: 'borne/:id/edit', component: EditBorneComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ADMINISTRATEUR',
        },
      },
      {
        path: 'dashboard/user', component: ListUserComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ADMINISTRATEUR',
        },
      },
      {
        path: 'dashboard/user/:id/edit', component: EditUserComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ADMINISTRATEUR',
        },
      },
      { path: 'clients', component: ListClientComponent },
      { path: 'client/:id', component: DetailClientComponent },
      {
        path: 'client/:id/edit', component: EditClientComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ADMINISTRATEUR',
        },
      },
      { path: 'offers', component: ListOffersComponent },
      { path: 'offer/:id', component: DetailOfferComponent },
      {
        path: 'offer/:id/edit', component: EditOfferComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ADMINISTRATEUR',
        },
      },

    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
