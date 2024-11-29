import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities: string[] = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier',
    'Agadir', 'Tetouan', 'Oujda', 'Kenitra', 'Meknes',
    'Safi', 'El Jadida', 'Nador', 'Khemisset', 'Settat'
  ];
  depart: string = '';
  destination: string = '';
  date: string = '';
  passengers: number = 1;
  user!: User;

  authService = inject(AuthService);
  userService = inject(UserService);

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.authService.isLoggedIn(); 
    if (isLoggedIn) {
      console.log('Connecté');
      this.userService.user$.subscribe(response => {
        this.user = response;
      });
    } else {
      console.log('Non connecté');
    }
  }

  async searchDrives(): Promise<void> {
    const isLoggedIn = await this.authService.isLoggedIn(); // Await the Promise
    if (!isLoggedIn) {
      await this.authService.redirectToLoginPage();
      return;
    }

    if (!this.depart || !this.destination) {
      alert('Veuillez remplir tous les champs pour la recherche.');
      return;
    }

    this.router.navigate(['/drives'], {
      queryParams: {
        depart: this.depart,
        destination: this.destination,
        date: this.date,
        passengers: this.passengers
      }
    });
  }
}
