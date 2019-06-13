import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';

export function tokenGetter() {
  return localStorage.getItem('accessToken');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FeaturesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    JwtModule.forRoot({
      config: {
        tokenGetter: (tokenGetter),
        whitelistedDomains: ['localhost:3000'],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
