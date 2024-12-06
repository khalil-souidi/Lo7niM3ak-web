import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/Car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private readonly apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/cars`, car);
  }

  getCarByUserId(userId: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/findCarByUserId/${userId}`);
  }
}
