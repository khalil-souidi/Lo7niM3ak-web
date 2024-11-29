import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  id?: number; // Optional for creating a review
  note: number;
  message: string;
  user: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/api/v1/reviews';

  constructor(private http: HttpClient) {}

  getReviewsByUserId(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/user/${userId}`);
  }

  getAverageNoteByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/user/${userId}/average-note`);
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}`, review);
  }

}
