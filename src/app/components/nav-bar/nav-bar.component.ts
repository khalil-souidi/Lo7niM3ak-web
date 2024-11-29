import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/keycloak/keycloak.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;

  authService = inject(AuthService);

  constructor() {}

  async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn(); 
  }

  login() {
    this.authService.redirectToLoginPage();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false; 
  }
}
