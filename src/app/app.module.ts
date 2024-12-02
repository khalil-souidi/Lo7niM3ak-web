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
import { HttpTokenInterceptor } from './auth/auth.interceptor';
import { initializeKeycloak } from 'src/init/keycloak-init.factory';
import { KeycloakService } from 'keycloak-angular';
import { DrivesComponent } from './components/drives/drives.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MyReservationComponent } from './components/my-reservations/my-reservations.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { ChatComponent } from './components/chat/chat.component';
import { MyConversationsComponent } from './components/my-conversations/my-conversations.component';





@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    DrivesComponent,
    ReservationDetailsComponent,
    CheckoutComponent,
    MyReservationComponent,
    MyOffersComponent,
    OfferDetailsComponent,
    ChatComponent,
    MyConversationsComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
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


