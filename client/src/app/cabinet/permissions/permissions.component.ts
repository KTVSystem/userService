import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationService } from '../../services/cabinet/shared/pagination/pagination.service';
import { Status } from '../../models/common/status/status';
import { statuses } from '../../models/common/status/lists/statuses-list';
import { PermissionService } from '../../services/cabinet/permissions/permission.service';
import { Permission } from '../../models/cabinet/users/permission';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit, OnDestroy {
  public permissions: Array<Permission> = [];
  public statuses: Array<Status>;
  public permissionsFilterForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl('0'),
  });
  public filterQueryString: string = '';
  displayedColumns: string[] = ['name', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public unsubscribe$ = new Subject();

  constructor(public paginationService: PaginationService, private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.getPermissions();
    this.statuses = statuses;
  }

  private getPermissions(): void {
    this.permissionService.getPermissions(this.filterQueryString).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      this.permissions = response.permissions;
      this.paginationService.dataSource = new MatTableDataSource<any>(response.permissions);
      this.paginationService.dataSource.paginator = this.paginator;
      this.paginationService.iterator(this.permissions);
    });
  }

  public onSubmit(): void {
    const name = (this.permissionsFilterForm.value.name !== '') ? this.permissionsFilterForm.value.name : null;
    const status = (this.permissionsFilterForm.value.status !== '0') ? this.permissionsFilterForm.value.status : null;
    this.filterQueryString = this.createFilterQueryParam(name, status);
    this.getPermissions();
  }

  public clearFilters(): void {
    this.permissionsFilterForm.patchValue({
      name: '',
      status: '0'
    });
    this.getPermissions();
  }

  private createFilterQueryParam(name: string, status: string): string {
    let filterString = '';
    filterString = (name) ? filterString + 'name=' + name + '&' : filterString;
    filterString = (status) ? filterString + 'status=' + status + '&' : filterString;
    filterString = (filterString !== '') ? '?' + filterString : filterString;
    filterString = (filterString !== '') ? filterString.substr(0, filterString.length - 1) : filterString;
    return filterString;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
