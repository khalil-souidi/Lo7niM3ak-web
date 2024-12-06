import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/services/reviews/reviews.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css'],
})
export class CreateReviewComponent {
  review: Review = {
    id: 0,
    note: 0,
    message: '',
    user: {
      id: 0,
      name: '',
      firstName: '',
      email: '',
      phone: '',
      role: '',
    },
  };

  constructor(
    private dialogRef: MatDialogRef<CreateReviewComponent>,
    private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {
     if (this.review.user) {
      this.review.user.id = data.userId;
    }}
    setRating(star: number): void {
      this.review.note = star;
    }
    

  submitReview(): void {
    // Validation des champs
    if (this.review.note < 1 || this.review.note > 5) {
      alert('Please provide a rating between 1 and 5.');
      return;
    }
    if (!this.review.message.trim()) {
      alert('Please provide a message.');
      return;
    }

    // Soumettre la review via le service
    this.reviewService.createReview(this.review).subscribe(
      (response) => {
        console.log('Review submitted successfully:', response);
        this.dialogRef.close(true); // Fermer avec succès
      },
      (error) => {
        console.error('Error submitting review:', error);
        this.dialogRef.close(false); // Fermer avec échec
      }
    );
  }

  cancel(): void {
    this.dialogRef.close(false); // Fermer sans succès
  }
}
