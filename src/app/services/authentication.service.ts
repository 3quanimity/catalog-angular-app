import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  users: AppUser[] = [];
  authenticatedUser: AppUser | undefined;

  constructor() {
    this.users.push(
      {
        userId: UUID.UUID(),
        userName: 'admin',
        password: 'admin',
        roles: ['ADMIN, USER'],
      },
      {
        userId: UUID.UUID(),
        userName: 'user',
        password: 'user',
        roles: ['USER'],
      },
      {
        userId: UUID.UUID(),
        userName: 'guest',
        password: 'guest',
        roles: ['GUEST'],
      }
    );
  }

  /**
   * login - Logs in a user by providing a userName and password as input.
   * @param {string} userName - The username of the user to login
   * @param {string} password - The password of the user to login
   * @returns {Observable<AppUser>} - An observable of the AppUser object representing the logged in user,
   *   or an error with the message 'User not found' or 'Invalid credentials' if the credentials are not valid
   */
  public login(userName: string, password: string): Observable<AppUser> {
    let appUser = this.users.find((user) => user.userName === userName);
    if (!appUser) {
      return throwError(() => new Error('User not found'));
    } else if (appUser.password !== password) {
      return throwError(() => new Error('Invalid credentials'));
    } else {
      return of(appUser);
    }
  }

  /**
   * authenticateUser -  used to authenticate a user by storing the authenticated user in local storage
   * and returning an observable of boolean value as true.
   * @param {AppUser} appUser - The AppUser object to authenticate
   * @returns {Observable<boolean>} - An observable of boolean value representing the success of the authentication
   */
  public authenticateUser(appUser: AppUser): Observable<boolean> {
    this.authenticatedUser = appUser;
    localStorage.setItem(
      'authenticatedUser',
      JSON.stringify({
        userName: appUser.userName,
        roles: appUser.roles,
        jwt: 'JWT_TOKEN',
      })
    );
    return of(true);
  }

  /**
   * hasRole - checks if the authenticated user has a specific role.
   *
   * @param {string} role - The role to check for
   * @returns {boolean} - True if the authenticated user has the specified role, false otherwise
   */
  public hasRole(role: string): boolean {
    return this.authenticatedUser?.roles.includes(role) || false;
  }

  /**
   * isAuthenticated - checks if the user is authenticated.
   *
   * @returns {boolean} - True if the user is authenticated, false otherwise
   */
  public isAuthenticated(): boolean {
    return this.authenticatedUser !== undefined;
  }
}
