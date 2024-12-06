import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDto } from 'src/app/models/ReservationDto';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/api/v1/reservations';

  constructor(private http: HttpClient) {}

  addReservation(reservation: ReservationDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, reservation);
  }

  acceptReservation(reservationId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reservationId}/accept`, {});
  }

  refuseReservation(reservationId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reservationId}/refuse`, {});
  }
  closeReservation(reservationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reservationId}/closed`, {});
  }
  

  cancelReservation(reservationId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reservationId}/cancel`, {});
  }

  createPaymentIntent(reservationId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${reservationId}/payment-intent`, {});
  }

  confirmPayment(reservationId: number, paymentIntentId: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/reservations/${reservationId}/confirm-payment`,
      { paymentIntentId }
    );
  }
  

  getReservationsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
  getReservationsByDriveId(driveId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/drive/${driveId}`);
  }
}
