import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../../token/token.service';
import { PermissionCreateDto } from '../../../models/cabinet/users/dtos/permission/permission-create-dto';

@Injectable({
  providedIn: 'root'
})

export class PermissionService {
  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.baseUrl = 'http://localhost:9999/permissions/';
    this.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.tokenService.getToken()}`});
  }

  public getPermissions(filterString?: string): Observable<any> {
    const url = (filterString) ? (this.baseUrl + filterString) : this.baseUrl;
    return this.http.get(url, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public getPermissionById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public createPermission(permission: PermissionCreateDto): Observable<any> {
    return this.http.post(this.baseUrl, permission, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public editPermission(id: number, permission: PermissionCreateDto): Observable<any> {
    return this.http.put(this.baseUrl + id, permission, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public removePermission(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
