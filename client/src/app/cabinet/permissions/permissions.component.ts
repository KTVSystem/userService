import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationService } from '../../services/cabinet/shared/pagination/pagination.service';
import { Status } from '../../models/common/status/status';
import { statuses } from '../../models/common/status/lists/statuses-list';
import { PermissionService } from "../../services/cabinet/permissions/permission.service";
import { Permission } from "../../models/cabinet/users/permission";

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  public permissions: Array<Permission> = [];
  public statuses: Array<Status>;
  public permissionsFilterForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl('0'),
  });
  public filterQueryString: string = '';

  constructor(public paginationService: PaginationService, private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.getUsers();
    this.statuses = statuses;
  }

  private getUsers(): void {
    this.permissionService.getPermissions(this.filterQueryString).subscribe((response) => {
      this.permissions = response.permissions;
      console.log(this.permissions);
      this.paginationService.initializaPagination.next(response.count);
    });
  }

  public onSubmit(): void {
    const name = (this.permissionsFilterForm.value.name !== '') ? this.permissionsFilterForm.value.name : null;
    const status = (this.permissionsFilterForm.value.status !== '0') ? this.permissionsFilterForm.value.status : null;
    this.filterQueryString = this.createFilterQueryParam(name, status);
    this.paginationService.page = 1;
    this.getUsers();
  }

  public clearFilters(): void {
    this.permissionsFilterForm.patchValue({
      name: '',
      status: '0'
    });
    this.getUsers();
  }

  public onPreviousPage(): void {
    this.setPageNumber();
    this.getUsers();
  }

  public onNextPage(): void {
    this.setPageNumber();
    this.getUsers();
  }

  private setPageNumber(): void {
    if (this.filterQueryString === '') {
      this.filterQueryString = '?page=' + this.paginationService.page;
    } else {
      this.filterQueryString = this.clearPageString(this.filterQueryString);
      const separator = this.filterQueryString !== '' ? '&' : '?';
      this.filterQueryString = this.filterQueryString + separator + 'page=' + this.paginationService.page;
    }
  }

  private clearPageString(filterQueryString: string): string {
    let filteredString = '';
    const splitArray = filterQueryString.split('&');
    splitArray.forEach((item) => {
      if (item.indexOf('page') === -1) {
        const ampersantValue = (item.indexOf('?') === -1) ? '&' : '';
        filteredString = filteredString + ampersantValue + item;
      }
    });
    return filteredString;
  }

  private createFilterQueryParam(name: string, status: string): string {
    let filterString = '';
    filterString = (name) ? filterString + 'name=' + name + '&' : filterString;
    filterString = (status) ? filterString + 'status=' + status + '&' : filterString;
    filterString = (filterString !== '') ? '?' + filterString : filterString;
    filterString = (filterString !== '') ? filterString.substr(0, filterString.length - 1) : filterString;
    return filterString;
  }

}
