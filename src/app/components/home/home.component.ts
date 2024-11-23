import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cities: string[] = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier',
    'Agadir', 'Tetouan', 'Oujda', 'Kenitra', 'Meknes',
    'Safi', 'El Jadida', 'Nador', 'Khemisset', 'Settat'
  ];
  depart: string = '';
  destination: string = '';
  date: string = '';
  passengers: number = 1;

  constructor(private router: Router) {}

  searchDrives(): void {
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
