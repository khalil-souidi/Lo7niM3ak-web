import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';
import { Review } from 'src/app/models/Review';
import { User } from 'src/app/models/User';
import { ReviewService } from 'src/app/services/reviews/reviews.service';
import { ReviewDto } from 'src/app/models/ReviewDto';

@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: User | null = null;
  reviews: ReviewDto[] = [];
  averageNote: number | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const isLoggedIn = await this.authService.isLoggedIn();
      if (isLoggedIn) {
        this.userService.getUserByMail().subscribe(
          (user) => {
            this.user = user;
            this.loadUserReviews(user.id);
            this.loadUserAverageNote(user.id);
          },
          (error) => {
            this.errorMessage = 'Impossible de charger le profil utilisateur.';
            console.error('Erreur lors du chargement du profil utilisateur :', error);
            this.isLoading = false;
          }
        );
      } else {
        this.errorMessage = 'Vous devez être connecté pour voir votre profil.';
        this.isLoading = false;
      }
    } catch (error) {
      this.errorMessage = 'Une erreur inattendue est survenue.';
      console.error('Erreur:', error);
      this.isLoading = false;
    }
  }

  loadUserReviews(userId: number): void {
    this.reviewService.getReviewsByUser(userId).subscribe(
      (reviews) => {
        this.reviews = reviews;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des avis :', error);
        this.errorMessage = 'Impossible de charger les avis.';
        this.isLoading = false;
      }
    );
  }

  loadUserAverageNote(userId: number): void {
    this.reviewService.getAverageNoteByUserId(userId).subscribe(
      (average) => {
        this.averageNote = average;
      },
      (error) => {
        console.error('Erreur lors du chargement de la note moyenne :', error);
        this.averageNote = null;
      }
    );
  }

  toggleRole(): void {
    if (this.user) {
      const newRole = this.user.role === 'driver' ? 'passenger' : 'driver';
      console.log(`Toggling role to: ${newRole}`);
      this.userService.updateUserRole(this.user.email, newRole).subscribe(
        (updatedUser) => {
          this.user!.role = updatedUser.role; // Update user role
          alert(`Rôle mis à jour avec succès: ${updatedUser.role}`);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du rôle:', error);
          alert('Erreur lors de la mise à jour du rôle.');
        }
      );
    }
  }
}  