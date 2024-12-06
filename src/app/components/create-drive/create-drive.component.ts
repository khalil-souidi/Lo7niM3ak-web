import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';
import { UserService } from 'src/app/services/user/user.service';
import { DrivesService } from 'src/app/services/drives/drives-service.service';
import { Drive } from 'src/app/models/Drives';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-create-drive',
  templateUrl: './create-drive.component.html',
  styleUrls: ['./create-drive.component.css'],
})
export class CreateDriveComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() driveCreated = new EventEmitter<Drive>();

  drive: Partial<Drive> = {
    pickup: '',
    destination: '',
    deptime: undefined,
    price: 0,
    seating: 0,
    description: '',
  };
  user!: User;

  cities: string[] = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier',
    'Agadir', 'Tetouan', 'Oujda', 'Kenitra', 'Meknes',
    'Safi', 'El Jadida', 'Nador', 'Khemisset', 'Settat',
  ];

  minDateTime: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private drivesService: DrivesService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);

    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.userService.getUserByMail().subscribe(
        (response: User) => {
          this.user = response;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      alert('Vous devez être connecté pour créer un trajet.');
      this.router.navigate(['/']);
    }
  }

  createDrive(): void {
    if (!this.user || !this.user.id) {
      alert('Les informations du conducteur sont manquantes.');
      return;
    }

    this.drive.driverId = this.user.id;

    this.drivesService.addDrive(this.drive as Drive).subscribe(
      (newDrive) => {
        alert('Trajet créé avec succès !');
        this.driveCreated.emit(newDrive);
        this.closePopup();
        this.router.navigate(['/MyOffers']); // Redirect to home
      },
      (error) => {
        console.error('Erreur lors de la création du trajet :', error);
        alert('Erreur lors de la création du trajet.');
      }
    );
  }

  closePopup(): void {
    this.close.emit();
  }

  isInvalidDrive(): boolean {
    return (
      !this.drive.pickup ||
      !this.drive.destination ||
      !this.drive.deptime ||
      this.drive.price === undefined ||
      this.drive.price < 0 ||
      this.drive.seating === undefined ||
      this.drive.seating < 0
    );
  }
}
