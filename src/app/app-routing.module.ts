import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClientComponent } from './features/client/list-client/list-client.component';
import { HomeComponent } from './features/home/home.component';
import { ListBorneComponent } from './features/borne/list-borne/list-borne.component';
import { DetailBorneComponent } from './features/borne/detail-borne/detail-borne.component';
import { EditBorneComponent } from './features/borne/edit-borne/edit-borne.component';

const routes: Routes = [
  { path: '', component: ListClientComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bornes', component: ListBorneComponent },
  { path: 'borne/:id', component: DetailBorneComponent },
  { path: 'borne/:id/edit', component: EditBorneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
