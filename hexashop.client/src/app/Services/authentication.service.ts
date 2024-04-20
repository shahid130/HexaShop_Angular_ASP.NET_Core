import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Iuser } from '../Interfaces/Iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private previousUrl: string | null = null;
  email: string | null = null;


  userInfo: Iuser = {
    userID: 0,
    userName: '',
    userEmail: '',
    userNumber: '',
    userAddress: ''
  }

  apiUrl = 'https://localhost:7127';
  auth = inject(HttpClient);
  constructor() { }

  createUser(user: any) {
    return this.auth.post<any>(this.apiUrl + '/api/Authentication/register', user);
  }

  getUserInfo(): Observable<Iuser> {
    let params = new HttpParams()
      .set('email', this.email!)
    return this.auth.get<Iuser>(this.apiUrl + '/api/Authentication/userinfo', { params }).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem('userObj', JSON.stringify(response));
        }
      }),
        catchError((error: any) => {
        throw error;
        })
      );
  }


  signIn(userEmail: string, userPassword: string) {
    return this.auth.post<any>(this.apiUrl + '/api/Authentication/authenticate', { userEmail, userPassword }).pipe(
      tap(response => {
        const token = response;
        if (token) {
          localStorage.setItem('token', token);
          this.email = userEmail;
        }
      }),
      catchError(error => {
        console.error('Error occurred while signing in:', error);
        return of(null);
      })
    );
  }
  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userObj');
    localStorage.removeItem('cartItems');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  setPreviousUrl(url: string): void {
    this.previousUrl = url;
  }

  getPreviousUrl(): string | null {
    return this.previousUrl;
  }

}
