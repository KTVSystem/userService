import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';
import { Role } from '../../../models/cabinet/users/role';

@Injectable({
  providedIn: 'root'
})

export class RolesService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:9999/roles/';
  }

  public getRoles(): Observable<any> {
    return this.http.get(this.baseUrl)
      .pipe(catchError(this.error));
  }

  public getActiveRoles() {
    return this.http.get(this.baseUrl)
      .pipe(map((res: any) => res.roles.filter((item: Role) => item.status === 'active')));
  }

  public getRoleById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + id)
      .pipe(catchError(this.error));
  }

  public createRole(role: RoleCreateDto): Observable<any> {
    return this.http.post(this.baseUrl, role)
      .pipe(catchError(this.error));
  }

  public editRole(id: string, role: RoleCreateDto): Observable<any> {
    return this.http.put(this.baseUrl + id, role)
      .pipe(catchError(this.error));
  }

  public removeRole(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + id)
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
