import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';
import { UserService } from 'src/app/services/user/user.service';
import { DrivesService } from 'src/app/services/drives/drives-service.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css'],
})
export class MyReservationComponent implements OnInit {
  reservations: any[] = [];
  user: User | null = null;
  isLoading = false;
  hasError = false;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private userService: UserService,
    private drivesService: DrivesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      const isLoggedIn = await this.authService.isLoggedIn();
      if (isLoggedIn) {
        this.userService.getUserByMail().subscribe(
          (user: User) => {
            this.user = user;
            this.loadReservations();
          },
          (error) => {
            console.error('Error fetching user:', error);
            this.handleError();
          }
        );
      } else {
        this.isLoading = false;
      }
    } catch (error) {
      console.error('Error during initialization:', error);
      this.handleError();
    }
  }

  loadReservations(): void {
    if (!this.user) {
      this.isLoading = false;
      return;
    }

    this.reservationService.getReservationsByUserId(this.user.id).subscribe(
      (reservations: any[]) => {
        if (reservations.length === 0) {
          this.isLoading = false;
          return;
        }

        const driveRequests = reservations.map((reservation) =>
          this.drivesService.getDriveById(reservation.driveId)
        );

        forkJoin(driveRequests).subscribe(
          (drives) => {
            this.reservations = reservations.map((reservation, index) => ({
              ...reservation,
              drive: drives[index],
              totalPrice: drives[index].price * reservation.seats,
            }));
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching drives:', error);
            this.handleError();
          }
        );
      },
      (error) => {
        console.error('Error fetching reservations:', error.message || error);
        this.handleError();
      }
    );
  }

  cancelReservation(reservationId: number): void {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      this.reservationService.cancelReservation(reservationId).subscribe(
        () => {
          alert('The reservation has been successfully canceled.');

          // Update the status of the canceled reservation locally
          const reservationIndex = this.reservations.findIndex(
            (res) => res.id === reservationId
          );
          if (reservationIndex !== -1) {
            this.reservations[reservationIndex].status = 'CANCELED';
          }
        },
        (error) => {
          console.error('Error cancelling reservation:', error);

          const reservationIndex = this.reservations.findIndex(
            (res) => res.id === reservationId
          );
          if (reservationIndex !== -1) {
            this.reservations[reservationIndex].status = 'CANCELED';
          }
        }
      );
    }
  }

  proceedToPayment(reservationId: number): void {
    alert(`Proceeding to payment for reservation ID: ${reservationId}`);
  }

  getStatusClass(status: string): string {
    return status.toLowerCase(); // Ensure consistency with CSS classes
  }

  private handleError(): void {
    this.hasError = true;
    this.isLoading = false;
  }
}
