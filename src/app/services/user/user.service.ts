import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/models/User";
import { AuthService } from "../keycloak/keycloak.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/user';

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  setCurrentUser(user: User) {
    this.userSubject.next(user);
  }

  resetCurrentUser() {
    this.userSubject.next(null);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUserRoleById(id: number): Observable<string> {
    return this.getUserById(id).pipe(
      map((user: User) => user.role) // Extracting the role field from the user object
    );
  }

  getUserByMail(): Observable<User> {
    return new Observable<User>(observer => {
      this.authService.loadUserProfile()
        .then(profile => {
          if (profile) {
            this.http.get<User>(`${this.apiUrl}/email/${profile.email}`)
              .subscribe({
                next: user => observer.next(user),
                error: err => observer.error(err),
                complete: () => observer.complete()
              });
          } else {
            observer.error('User profile is undefined');
          }
        })
        .catch(error => observer.error(error));
    });
  }

  updateUserRole(email: string, newRole: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/role`, null, {
      params: { email, newRole },
    });
  }
}
