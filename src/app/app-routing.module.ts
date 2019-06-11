import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClientComponent } from './features/client/list-client/list-client.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: ListClientComponent },
  { path: 'home', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
