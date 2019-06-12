import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClientComponent } from './features/client/list-client/list-client.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DetailClientComponent } from './features/client/detail-client/detail-client.component';

const routes: Routes = [
  { path: '', component: ListClientComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'clients/detail', component: DetailClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
