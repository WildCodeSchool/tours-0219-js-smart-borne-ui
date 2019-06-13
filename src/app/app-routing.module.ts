import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClientComponent } from './features/client/list-client/list-client.component';
import { ListBorneComponent } from './features/borne/list-borne/list-borne.component';
import { DetailBorneComponent } from './features/borne/detail-borne/detail-borne.component';
import { EditBorneComponent } from './features/borne/edit-borne/edit-borne.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DetailClientComponent } from './features/client/detail-client/detail-client.component';

const routes: Routes = [
  { path: 'client', component: ListClientComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bornes', component: ListBorneComponent },
  { path: 'borne/:id', component: DetailBorneComponent },
  { path: 'borne/:id/edit', component: EditBorneComponent },
  { path: 'clients/detail', component: DetailClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
