import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path:  '',
    component:  HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'bornes', component: ListBorneComponent },
      { path: 'borne/:id', component: DetailBorneComponent },
      { path: 'borne/:id/edit', component: EditBorneComponent },
      { path: 'dashboard/user', component: ListUserComponent },
      { path: 'dashboard/user/:id/edit', component: EditUserComponent },
      { path: 'clients', component: ListClientComponent },
      { path: 'clients/detail', component: DetailClientComponent },
    ]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
