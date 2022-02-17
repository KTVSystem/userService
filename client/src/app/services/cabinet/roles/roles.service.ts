import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class RolesService {
  private baseUrl: string;

  constructor(private http: HttpClient, private translateService: TranslateService) {
    this.baseUrl = 'http://localhost:9999/roles/';
  }

  public getRoles(filterString?: string): Observable<any> {
    const url = (filterString) ? (this.baseUrl + filterString) : this.baseUrl;
    return this.http.get(url)
      .pipe(catchError(this.error));
  }

  public getRoleById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id + `?lang=${this.translateService.defaultLang}`)
      .pipe(catchError(this.error));
  }

  public createRole(role: RoleCreateDto): Observable<any> {
    return this.http.post(this.baseUrl + `?lang=${this.translateService.defaultLang}`, role)
      .pipe(catchError(this.error));
  }

  public editRole(id: number, role: RoleCreateDto): Observable<any> {
    return this.http.put(this.baseUrl + id + `?lang=${this.translateService.defaultLang}`, role)
      .pipe(catchError(this.error));
  }

  public removeRole(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id + `?lang=${this.translateService.defaultLang}`)
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
