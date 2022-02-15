import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PermissionCreateDto } from '../../../models/cabinet/users/dtos/permission/permission-create-dto';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class PermissionService {
  private baseUrl: string;

  constructor(private http: HttpClient, private translateService: TranslateService) {
    this.baseUrl = 'http://localhost:9999/permissions/';
  }

  public getPermissions(filterString?: string): Observable<any> {
    const url = (filterString) ? (this.baseUrl + filterString) : this.baseUrl;
    return this.http.get(url)
      .pipe(catchError(this.error));
  }

  public getPermissionsAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'all')
      .pipe(catchError(this.error));
  }

  public getPermissionById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id + `?lang=${this.translateService.defaultLang}`)
      .pipe(catchError(this.error));
  }

  public createPermission(permission: PermissionCreateDto): Observable<any> {
    return this.http.post(this.baseUrl + `?lang=${this.translateService.defaultLang}`, permission)
      .pipe(catchError(this.error));
  }

  public editPermission(id: number, permission: PermissionCreateDto): Observable<any> {
    return this.http.put(this.baseUrl + id + `?lang=${this.translateService.defaultLang}`, permission)
      .pipe(catchError(this.error));
  }

  public removePermission(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id + `?lang=${this.translateService.defaultLang}`)
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
