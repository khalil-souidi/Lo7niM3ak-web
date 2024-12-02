import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-conversations',
  templateUrl: './my-conversations.component.html',
  styleUrls: ['./my-conversations.component.css'],
})
export class MyConversationsComponent implements OnInit {
  conversations: any[] = [];
  currentUserId!: number;
  isLoading = false;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.authService.loadUserProfile().then((profile) => {
        this.userService.getUserByMail().subscribe(
          (user) => {
            this.currentUserId = user.id; // Assign the ID of the connected user
            this.loadConversations();
          },
          (error) => {
            console.error('Error fetching connected user:', error);
            this.isLoading = false;
          }
        );
      });
    } else {
      this.isLoading = false;
    }
  }

  loadConversations(): void {
    this.chatService.getMyConversations(this.currentUserId).subscribe(
      (conversations) => {
        this.conversations = conversations;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading conversations:', error);
        this.isLoading = false;
      }
    );
  }

  navigateToChat(userId: number, userName: string): void {
    this.router.navigate(['/chat'], { queryParams: { clientId: userId, clientName: userName } });
  }
}
