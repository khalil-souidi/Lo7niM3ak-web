import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationDto } from 'src/app/models/ReservationDto';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css'],
})
export class ReservationDetailsComponent implements OnInit {
  user!: User | null;
  drive: any;
  driveId: number | undefined;
  price!: number;
  selectedSeats: number = 1;
  totalPrice!: number;
  seatError: boolean = false; // Error state for invalid seat selection

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.userService.getUserByMail().subscribe(
        (response: User) => {
          this.user = response;
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }

    this.route.queryParams.subscribe((params) => {
      this.driveId = params['driveId'];
      this.price = params['price'];
      this.totalPrice = this.price * this.selectedSeats;

      this.fetchDriveDetails();
    });
  }

  fetchDriveDetails(): void {
    this.drive = {
      pickup: 'Casablanca',
      destination: 'Rabat',
      deptime: new Date(),
      price: this.price,
      seating: 5,
    };
  }

  validateSeats(): void {
    if (this.selectedSeats > this.drive.seating) {
      this.seatError = true;
    } else {
      this.seatError = false;
      this.updateTotalPrice();
    }
  }

  completeReservation(): void {
    if (!this.user) {
      alert('You must be logged in to complete the reservation.');
      return;
    }

    const reservation: ReservationDto = {
      seats: this.selectedSeats,
      driveId: this.driveId!,
      userId: this.user.id,
    };

    this.reservationService.addReservation(reservation).subscribe(
      (reservationResponse: any) => {
        console.log('Reservation successful:', reservationResponse);
        alert('Réservation réussie !');
        this.router.navigate(['/home']); // Navigate to home or any other desired page
      },
      (error) => {
        console.error('Error creating reservation:', error);
        alert('Erreur lors de la réservation.');
      }
    );
  }

  updateTotalPrice(): void {
    this.totalPrice = this.price * this.selectedSeats;
  }
}
