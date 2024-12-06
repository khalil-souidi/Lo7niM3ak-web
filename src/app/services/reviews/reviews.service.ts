import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/Review';
import { ReviewDto } from 'src/app/models/ReviewDto';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/reviews';

  constructor(private http: HttpClient) {}

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  getReviewsByUserId(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/user/${userId}`);
  }

  getAverageNoteByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/${userId}/average-note`);
  }
  getReviewsByUser(userId: number): Observable<ReviewDto[]> {
    return this.http.get<ReviewDto[]>(`${this.apiUrl}/users/${userId}`);
  }
}
