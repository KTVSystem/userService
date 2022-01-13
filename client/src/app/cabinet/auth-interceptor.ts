import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.includes('/users/') || request.url.includes('/permissions/') || request.url.includes('/roles/')
    ) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.tokenService.getToken()}`
        }
      });
      return next.handle(request);
    }
    return next.handle(request);
  }
}
