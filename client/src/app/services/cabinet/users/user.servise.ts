import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserCreateDto } from '../../../models/cabinet/users/dtos/user/user-create-dto';
import { UserEditDto } from '../../../models/cabinet/users/dtos/user/user-edit-dto';
import { UserChangePasswordDto } from '../../../models/cabinet/users/dtos/user/user-change-password-dto';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9999/users/';
  }

  public getUsers(filterString?: string): Observable<any> {
    const url = (filterString) ? (this.baseUrl + filterString) : this.baseUrl;
    return this.http.get(url)
      .pipe(catchError(this.error));
  }

  public getUserById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id)
      .pipe(catchError(this.error));
  }

  public createUser(user: UserCreateDto): Observable<any> {
    return this.http.post(this.baseUrl, user)
      .pipe(catchError(this.error));
  }

  public editUser(id: number, user: UserEditDto): Observable<any> {
    return this.http.put(this.baseUrl + id, user)
      .pipe(catchError(this.error));
  }

  public changePasswordUser(id: number, password: UserChangePasswordDto): Observable<any> {
    return this.http.put(this.baseUrl + id + '/change-password', password)
      .pipe(catchError(this.error));
  }

  public removeUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id)
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
