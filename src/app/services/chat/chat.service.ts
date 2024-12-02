import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly apiUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(senderId: number, receiverId: number, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, { senderId, receiverId, content });
  }

  getConversation(userId1: number, userId2: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conversation`, {
      params: { userId1, userId2 },
    });
  }

  getMyConversations(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-conversations/${userId}`);
  }
  markMessagesAsRead(senderId: number, receiverId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/mark-read`, null, {
      params: { senderId, receiverId },
    });
  }
  
}
