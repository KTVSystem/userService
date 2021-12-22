import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../../token/token.service';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';

@Injectable({
  providedIn: 'root'
})

export class RolesService {
  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.baseUrl = 'http://localhost:9999/roles/';
    this.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.tokenService.getToken()}`});
  }

  public getRoles(filterString?: string): Observable<any> {
    const url = (filterString) ? (this.baseUrl + filterString) : this.baseUrl;
    return this.http.get(url, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public getRoleById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public createRole(role: RoleCreateDto): Observable<any> {
    return this.http.post(this.baseUrl, role, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public editRole(id: number, role: RoleCreateDto): Observable<any> {
    return this.http.put(this.baseUrl + id, role, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  public removeRole(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
