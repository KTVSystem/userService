import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../../models/login/login';
import { SocialUser } from '../../models/login/social-user';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9999/auth/';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  public signIn(login: Login): Observable<any> {
    return this.http.post(this.baseUrl + 'signin', {email: login.email, password: login.password, type: 'Admin'},
      { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public signInSocial(socialUser: SocialUser): Observable<any> {
    return this.http.post(this.baseUrl + 'social', {socialUser, type: 'Admin'},
      { headers: this.headers })
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
