import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DrivesComponent } from './components/drives/drives.component';
import { HttpTokenInterceptor } from './auth/auth.interceptor';
import { initializeKeycloak } from 'src/init/keycloak-init.factory';
import { DrivesService } from './services/drives-service.service';
import { KeycloakService } from 'keycloak-angular';
//import { CheckoutComponent } from './components/checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    DrivesComponent,
   // CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    
  
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: initializeKeycloak,
      multi: true
    },
    KeycloakService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


