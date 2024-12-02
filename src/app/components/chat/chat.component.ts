import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  currentUserId!: number; 
  clientId!: number;
  clientName!: string;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.loadUserProfile().then((profile) => {
      this.userService.getUserByMail().subscribe(
        (user) => {
          this.currentUserId = user.id; // Assign the connected user's ID
          this.route.queryParams.subscribe((params) => {
            this.clientId = params['clientId'];
            this.clientName = params['clientName'];
            this.loadConversation();
            this.markMessagesAsRead();
          });
        },
        (error) => console.error('Error fetching logged-in user:', error)
      );
    });
  }

  loadConversation(): void {
    this.chatService.getConversation(this.currentUserId, this.clientId).subscribe(
      (messages) => (this.messages = messages),
      (error) => console.error('Error loading conversation:', error)
    );
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    this.chatService.sendMessage(this.currentUserId, this.clientId, this.newMessage).subscribe(
      (message) => {
        this.messages.push(message);
        this.newMessage = '';
      },
      (error) => console.error('Error sending message:', error)
    );
  }

  markMessagesAsRead(): void {
    this.chatService.markMessagesAsRead(this.clientId, this.currentUserId).subscribe(
      () => console.log('Messages marked as read'),
      (error) => console.error('Error marking messages as read:', error)
    );
  }
}
