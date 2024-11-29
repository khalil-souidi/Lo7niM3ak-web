import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  currentDate: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize the current date
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  // Corrected return type for the method
  searchDrives(): void {
    // Check if all necessary fields are filled
    if (!this.depart || !this.destination) {
      alert('Veuillez remplir tous les champs pour la recherche.');
      return;
    }

    // Navigate to the drives page with query parameters
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
