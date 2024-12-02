import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrivesService } from 'src/app/services/drives/drives-service.service';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css'],
})
export class MyOffersComponent implements OnInit {
  drives: any[] = [];
  user: User | null = null;
  isLoading = false;
  hasError = false;

  constructor(
    private drivesService: DrivesService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      const isLoggedIn = await this.authService.isLoggedIn();
      if (isLoggedIn) {
        this.userService.getUserByMail().subscribe(
          (user: User) => {
            this.user = user;
            this.loadDrives();
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

  loadDrives(): void {
    if (!this.user) {
      this.isLoading = false;
      return;
    }

    this.drivesService.getDrivesByUserId(this.user.id).subscribe(
      (drives: any[]) => {
        this.drives = drives;
        this.drives = drives.sort((a, b) => new Date(b.deptime).getTime() - new Date(a.deptime).getTime());
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching drives:', error);
        this.handleError();
      }
    );
  }

  navigateToOfferDetails(driveId: number): void {
    this.router.navigate(['/offer-details'], { queryParams: { driveId } });
  }

  private handleError(): void {
    this.hasError = true;
    this.isLoading = false;
  }
}
