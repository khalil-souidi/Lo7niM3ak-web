import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { DrivesService } from 'src/app/services/drives/drives-service.service';
import { UserService } from 'src/app/services/user/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  driveId!: number;
  reservations: any[] = [];
  driveDetails: any = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private drivesService: DrivesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.driveId = params['driveId'];
      this.loadDriveDetails();
      this.loadReservations();
    });
  }

  loadDriveDetails(): void {
    this.drivesService.getDriveById(this.driveId).subscribe(
      (drive) => {
        this.driveDetails = drive;
      },
      (error) => {
        console.error('Error fetching drive details:', error);
      }
    );
  }

  loadReservations(): void {
    this.isLoading = true;
    this.reservationService.getReservationsByDriveId(this.driveId).subscribe(
      (reservations: any[]) => {
        const userRequests = reservations.map((reservation) =>
          this.userService.getUserById(reservation.userId)
        );
        forkJoin(userRequests).subscribe(
          (users) => {
            this.reservations = reservations.map((reservation, index) => ({
              ...reservation,
              user: users[index],
              totalAmount: this.driveDetails?.price * reservation.seats,
            }));
            this.reservations.reverse();  
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching user details:', error);
            this.isLoading = false;
          }
        );
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        this.isLoading = false;
      }
    );
  }
  

  acceptReservation(reservationId: number): void {
    this.updateReservationStatus(reservationId, 'ACCEPTED');
    this.reservationService.acceptReservation(reservationId).subscribe(
      () => {
        alert('Reservation accepted successfully.');
      },
    );
  }

  refuseReservation(reservationId: number): void {
    this.updateReservationStatus(reservationId, 'REFUSED');
    this.reservationService.refuseReservation(reservationId).subscribe(
      () => {
        alert('Reservation refused successfully.');
      },
    );
  }

  updateReservationStatus(reservationId: number, status: string): void {
    const reservation = this.reservations.find((r) => r.id === reservationId);
    if (reservation) {
      reservation.status = status;
    }
  }

  getStatusClass(status: string): string {
    return `status ${status.toLowerCase()}`;
  }

  navigateToChat(clientId: number, clientFirstName: string, clientLastName: string): void {
    this.router.navigate(['/chat'], {
      queryParams: { clientId, clientFirstName, clientLastName },
    });
  }
}
