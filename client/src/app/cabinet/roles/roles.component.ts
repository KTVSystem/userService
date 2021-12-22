import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationService } from '../../services/cabinet/shared/pagination/pagination.service';
import { Status } from '../../models/common/status/status';
import { statuses } from '../../models/common/status/lists/statuses-list';
import { Role } from '../../models/cabinet/users/role';
import { RolesService } from '../../services/cabinet/roles/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  public roles: Array<Role> = [];
  public statuses: Array<Status>;
  public rolesFilterForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl('0'),
  });
  public filterQueryString: string = '';

  constructor(public paginationService: PaginationService, private rolesService: RolesService) { }

  ngOnInit(): void {
    this.getUsers();
    this.statuses = statuses;
  }

  private getUsers(): void {
    this.rolesService.getRoles(this.filterQueryString).subscribe((response) => {
      this.roles = response.roles;
      console.log(this.roles);
      this.paginationService.initializaPagination.next(response.count);
    });
  }

  public onSubmit(): void {
    const name = (this.rolesFilterForm.value.name !== '') ? this.rolesFilterForm.value.name : null;
    const status = (this.rolesFilterForm.value.status !== '0') ? this.rolesFilterForm.value.status : null;
    this.filterQueryString = this.createFilterQueryParam(name, status);
    this.paginationService.page = 1;
    this.getUsers();
  }

  public clearFilters(): void {
    this.rolesFilterForm.patchValue({
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
