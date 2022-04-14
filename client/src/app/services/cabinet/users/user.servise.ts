import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserCreateDto } from '../../../models/cabinet/users/dtos/user/user-create-dto';
import { UserEditDto } from '../../../models/cabinet/users/dtos/user/user-edit-dto';
import { UserChangePasswordDto } from '../../../models/cabinet/users/dtos/user/user-change-password-dto';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../models/cabinet/users/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl: string;

  constructor(private http: HttpClient, private translateService: TranslateService) {
    this.baseUrl = 'http://localhost:9999/users/';
  }

  public getUsers(): Observable<User[] | any> {
    return this.http.get(this.baseUrl)
      .pipe(catchError(this.error));
  }

  public getUserById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + id)
      .pipe(catchError(this.error));
  }

  public createUser(user: UserCreateDto): Observable<any> {
    return this.http.post(this.baseUrl + `?lang=${this.translateService.defaultLang}`, user)
      .pipe(catchError(this.error));
  }

  public editUser(id: string, user: UserEditDto): Observable<any> {
    return this.http.put(this.baseUrl + id + `?lang=${this.translateService.defaultLang}`, user)
      .pipe(catchError(this.error));
  }

  public changePasswordUser(id: string, password: UserChangePasswordDto): Observable<any> {
    return this.http.put(this.baseUrl + id + `/change-password?lang=${this.translateService.defaultLang}`, password)
      .pipe(catchError(this.error));
  }

  public removeUser(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + id + `?lang=${this.translateService.defaultLang}`)
      .pipe(catchError(this.error));
  }

  public unbindSocial(id: string, socialId: string): Observable<any> {
    return this.http.get(this.baseUrl + id + '/unbind-social/' + socialId + `?lang=${this.translateService.defaultLang}`)
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
