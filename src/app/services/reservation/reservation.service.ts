import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDto } from 'src/app/models/ReservationDto';

@Injectable({
  providedIn: 'root' 
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/api/v1/reservations'; 

  constructor(private http: HttpClient) { }

  addReservation(reservation: ReservationDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, reservation);
  }

  acceptReservation(reservationId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/accept/${reservationId}`, {});
  }

  // Refuse a reservation
  refuseReservation(reservationId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/refuse/${reservationId}`, {});
  }

  // Cancel a reservation
  cancelReservation(reservationId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cancel/${reservationId}`, {});
  }

  // Create a payment intent (Stripe)
  createPaymentIntent(reservationId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${reservationId}/payment-intent`, {});
  }

  confirmPayment(reservationId: number, paymentIntentId: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${reservationId}/confirm-payment?paymentIntentId=${paymentIntentId}`,
      {}
    );
  }
  createBill(reservation: ReservationDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-bill`, reservation);
  }
  
  
}
