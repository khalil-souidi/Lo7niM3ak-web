import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Drive } from 'src/app/models/Drives';
import { User } from 'src/app/models/User';
import { DrivesService } from 'src/app/services/drives/drives-service.service';
import { ReviewService } from 'src/app/services/reviews/reviews.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrls: ['./drives.component.css']
})
export class DrivesComponent implements OnInit {
  drives: Drive[] = [];
  filteredDrives: Drive[] = [];
  filters = {
    seats: 1,
    date: ''
  };
  depart: string = '';
  destination: string = '';
  currentDateTime: Date = new Date();
  currentDate: string;

  constructor(
    private drivesService: DrivesService,
    private userService: UserService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router : Router
  ) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.depart = params['depart'] || '';
      this.destination = params['destination'] || '';
      this.filters.date = params['date'] || '';
      this.filters.seats = params['passengers'] || 1;
      this.fetchDrives();
    });
  }
  fetchDrives(): void {
    this.drivesService.getAllDrives().subscribe((drives: Drive[]) => {
      drives.forEach((drive) => {
        // Fetch driver info
        this.userService.getUserById(drive.driverId).subscribe({
          next: (driver: User) => {
            drive.driver = driver;

            // Fetch average note
            this.reviewService.getAverageNoteByUserId(driver.id).subscribe({
              next: (avgNote: number) => {
                drive.avgNote = avgNote; // Store the average note
              },
              error: () => {
                drive.avgNote = 0; // Default to 0 if no reviews
              }
            });
          },
          error: () => {
            drive.driver = undefined;
            drive.avgNote = 0; // Default to 0
          }
        });
      });

      this.drives = drives;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredDrives = this.drives.filter((drive) => {
      const matchesDeparture = drive.pickup.toLowerCase() === this.depart.toLowerCase();
      const matchesArrival = drive.destination.toLowerCase() === this.destination.toLowerCase();
      const matchesSeats = drive.seating >= this.filters.seats;

      const driveDateTime = new Date(drive.deptime);
      const matchesDate = !this.filters.date || driveDateTime.toISOString().split('T')[0] === this.filters.date;
      const isFutureDrive = driveDateTime >= this.currentDateTime;

      return matchesDeparture && matchesArrival && matchesSeats && matchesDate && isFutureDrive;
    });
  }
  generateStars(avgNote: number): number[] {
    const fullStars = Math.floor(avgNote); 
    return Array(fullStars).fill(1); 
  }
  reserveDrive(drive: Drive): void {
    this.router.navigate(['/reservation-details'], { queryParams: { driveId: drive.id, price: drive.price } });
  }
}
