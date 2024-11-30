import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDto } from 'src/app/models/ReservationDto';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { CheckoutComponent } from '../checkout/checkout.component';
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

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private dialog: MatDialog,
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
        console.log('Reservation response:', reservationResponse);

        this.reservationService.createPaymentIntent(reservationResponse.id).subscribe(
          (paymentIntentResponse: any) => {
            console.log('Payment Intent response:', paymentIntentResponse);
            this.openPaymentDialog(reservationResponse.id, paymentIntentResponse.client_secret);
          },
          (error) => {
            console.error('Error creating payment intent:', error);
          }
        );
      },
      (error) => {
        console.error('Error creating reservation:', error);
      }
    );
  }

  openPaymentDialog(reservationId: number, clientSecret: string): void {
    const dialogRef = this.dialog.open(CheckoutComponent, {
      data: { reservationId, clientSecret, amount: this.totalPrice, email: this.user?.email },
      width: '800px',
      disableClose : true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'paymentSuccess') {
        this.router.navigate(['/home']);
      } else {
        alert('Payment canceled or failed.');
      }
    });
  }

  updateTotalPrice(): void {
    this.totalPrice = this.price * this.selectedSeats;
  }
}
