import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DrivesComponent } from './components/drives/drives.component';
import { authGuard } from './auth/auth.guard';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { MyReservationComponent } from './components/my-reservations/my-reservations.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { ChatComponent } from './components/chat/chat.component';
import { MyConversationsComponent } from './components/my-conversations/my-conversations.component';
import { ProfilComponent } from './components/profil/profil.component';
import { DriverDocumentsComponent } from './components/driver-documents/driver-documents.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservation-details', component: ReservationDetailsComponent},
  { path: 'drives', component: DrivesComponent},// canActivate: [authGuard],
  { path: 'MyReservations', component: MyReservationComponent},// canActivate: [authGuard],
  { path: 'MyOffers', component: MyOffersComponent},// canActivate: [authGuard],
  { path: 'offer-details', component: OfferDetailsComponent},// canActivate: [authGuard],
  { path: 'chat', component: ChatComponent},// canActivate: [authGuard],
  { path: 'MyConversations', component: MyConversationsComponent},// canActivate: [authGuard],
  { path: 'profile', component: ProfilComponent },
  { path: 'driver-documents', component: DriverDocumentsComponent },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
