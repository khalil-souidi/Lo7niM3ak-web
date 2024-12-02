import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drive } from 'src/app/models/Drives';

@Injectable({
  providedIn: 'root'
})
export class DrivesService {
  private baseUrl = 'http://localhost:8080/api/v1/drives'; 
  constructor(private http: HttpClient) {}

  getAllDrives(): Observable<Drive[]> {
    return this.http.get<Drive[]>(this.baseUrl);
  }

  addDrive(drive: Drive): Observable<Drive> {
    return this.http.post<Drive>(this.baseUrl, drive);
  }

  getDriveById(driveId: number): Observable<Drive> {
    return this.http.get<Drive>(`http://localhost:8080/api/v1/drives/findDriveById/${driveId}`);
  }
  getDrivesByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/findListDriveByUserId/${userId}`);
  }
  
}
