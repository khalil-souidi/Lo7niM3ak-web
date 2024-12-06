import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from 'src/app/models/Document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private readonly apiUrl = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient) {}

  uploadDocument(formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/upload`, formData);
  }

  getDocumentsByUserId(userId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/user/${userId}`);
  }
  downloadDocument(documentId: number) {
    return this.http.get(`${this.apiUrl}/${documentId}/download`, {
      responseType: 'blob',
    });
  }
}
