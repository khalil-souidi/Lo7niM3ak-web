import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DrivesComponent } from './components/drives/drives.component';
import { authGuard } from './auth/auth.guard';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservation-details', component: ReservationDetailsComponent},
  { path: 'drives', component: DrivesComponent},// canActivate: [authGuard],
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
