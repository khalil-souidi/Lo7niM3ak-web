import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Drive } from 'src/app/models/Drives';
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

  currentDate: any;
  isDriver: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    this.userService.getUserByMail().subscribe({
      next: (user) => {
        if (user.role === 'driver') {
          this.isDriver = true;
        }
      },
      error: (err) => console.error('Error fetching user role:', err)
    });
  }

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

  showCreateDrivePopup: boolean = false;

  openCreateDrivePopup(): void {
    this.showCreateDrivePopup = true;
  }

  closeCreateDrivePopup(): void {
    this.showCreateDrivePopup = false;
  }

  handleNewDrive(newDrive: Drive): void {
    console.log('Nouveau trajet créé:', newDrive);
    this.closeCreateDrivePopup();
  }
}
