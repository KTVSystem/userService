import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Token } from '../../models/token/token';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() {

  }

  public get isAuth(): boolean {
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');
    let result: boolean;

    if (token && (role === 'Admin'))
      result = true;
    else
      result = false;
    return result;
  }

  public writeToken(jwtToken: string): void {
    const tokenData: Token = jwt_decode(jwtToken);
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('id', tokenData.id);
    localStorage.setItem('email', tokenData.email);
    localStorage.setItem('role', tokenData.role);
    localStorage.setItem('iat', tokenData.iat);
    localStorage.setItem('exp', tokenData.exp);
    console.log(tokenData);
  }

  public deleteToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('iat');
    localStorage.removeItem('exp');
  }

  public getToken(): string|null {
    return localStorage.getItem('token');
  }

}
