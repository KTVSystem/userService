import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';

@Injectable({
  providedIn: 'root'
})

export class RolesService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9999/roles/';
  }

  public getRoles(filterString?: string): Observable<any> {
    const url = (filterString) ? (this.baseUrl + filterString) : this.baseUrl;
    return this.http.get(url)
      .pipe(catchError(this.error));
  }

  public getRoleById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id)
      .pipe(catchError(this.error));
  }

  public createRole(role: RoleCreateDto): Observable<any> {
    return this.http.post(this.baseUrl, role)
      .pipe(catchError(this.error));
  }

  public editRole(id: number, role: RoleCreateDto): Observable<any> {
    return this.http.put(this.baseUrl + id, role)
      .pipe(catchError(this.error));
  }

  public removeRole(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id)
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
