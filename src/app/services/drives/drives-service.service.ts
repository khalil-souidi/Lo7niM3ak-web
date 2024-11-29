import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drive } from 'src/app/models/Drives';

@Injectable({
  providedIn: 'root'
})
export class DrivesService {
  private baseUrl = 'http://localhost:8080/api/v1/drives'; // Backend API base URL

  constructor(private http: HttpClient) {}

  // Fetch all drives
  getAllDrives(): Observable<Drive[]> {
    return this.http.get<Drive[]>(this.baseUrl);
  }

  // Add a new drive
  addDrive(drive: Drive): Observable<Drive> {
    return this.http.post<Drive>(this.baseUrl, drive);
  }
}
