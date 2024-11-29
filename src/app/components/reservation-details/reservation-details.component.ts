import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationDto } from 'src/app/models/ReservationDto';
import { Drive } from 'src/app/models/Drives';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { DrivesService } from 'src/app/services/drives/drives-service.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  drive: Drive | undefined;
  selectedSeats: number = 1;
  totalPrice: number | undefined;
  driveId: number | undefined;
  price!: number;
  user!: User | null; // Allow user to be null initially

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private drivesService: DrivesService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      console.log('User is logged in');
      this.userService.getUserByMail().subscribe(
        (response: User) => {
          this.userService.setCurrentUser(response); // Save the user to BehaviorSubject
          this.user = response; // Set user locally in the component
          console.log('User Info: ', this.user);
        },
        (error) => {
          console.error('Error fetching user:', error);
          alert('Error fetching user information.');
        }
      );
    } else {
      console.log('User is not logged in');
    }

    this.route.queryParams.subscribe(params => {
      this.driveId = params['driveId'];
      this.price = params['price'];
      this.totalPrice = this.price * this.selectedSeats;

      if (this.driveId) {
        this.fetchDriveDetails();
      }
    });
  }

  fetchDriveDetails(): void {
    this.drivesService.getDriveById(this.driveId!).subscribe(
      (drive: Drive) => {
        this.drive = drive;  // Assign the fetched drive to the component's drive property
      },
      (error) => {
        console.error('Error fetching drive details:', error);
      }
    );
  }

  completeReservation(): void {
    if (!this.user) {
      alert('You must be logged in to complete the reservation.');
      return; // Prevent reservation if user is not available
    }

    const reservation: ReservationDto = {
      seats: this.selectedSeats,
      driveId: this.driveId!,
      userId: this.user.id // Ensure the user ID is available
    };

    this.reservationService.addReservation(reservation).subscribe(
      (response) => {
        console.log('Reservation created successfully', response);
        alert('Réservation réussie!');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error creating reservation', error);
        alert('Erreur lors de la réservation.');
      }
    );
  }

  updateTotalPrice(): void {
    this.totalPrice = this.price * this.selectedSeats;
  }
}
