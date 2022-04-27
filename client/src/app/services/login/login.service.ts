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
    return this.http.post(this.baseUrl + 'signin',
      {email: login.email, password: login.password, type: 'Admin'},
      { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public signInSocial(socialUser: SocialUser): Observable<any> {
    return this.http.post(this.baseUrl + 'social', {socialUser, type: 'Admin'},
      { headers: this.headers })
      .pipe(catchError(this.error));
  }

  storeWrongAttemp(): string | null {
    let wrong = localStorage.getItem('wrong');
    if (wrong) {
      const newWrong = Number(wrong) + 1;
      localStorage.setItem('wrong', String(newWrong));
    } else {
      localStorage.setItem('wrong', '1');
    }
    return localStorage.getItem('wrong');
  }

  blockUser(): void {
    const time = new Date().getTime() + 5 * 60000;
    localStorage.setItem('block', String(time));
  }

  isBlockUser() : boolean {
    let blockTime = localStorage.getItem('block');
    if (blockTime) {
      const currentTime = new Date().getTime();
      return !(Number(currentTime) > Number(blockTime));
    }
    return false;
  }

  clearBlockData(): void {
    localStorage.removeItem('wrong');
    localStorage.removeItem('block');
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
