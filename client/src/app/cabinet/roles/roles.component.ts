import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationService } from '../../services/cabinet/shared/pagination/pagination.service';
import { Status } from '../../models/common/status/status';
import { statuses } from '../../models/common/status/lists/statuses-list';
import { Role } from '../../models/cabinet/users/role';
import { RolesService } from '../../services/cabinet/roles/roles.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['name', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public paginationService: PaginationService, private rolesService: RolesService) { }

  ngOnInit(): void {
    this.getRoles();
    this.statuses = statuses;
  }

  private getRoles(): void {
    this.rolesService.getRoles(this.filterQueryString).subscribe((response) => {
      this.roles = response.roles;
      this.paginationService.dataSource = new MatTableDataSource<any>(response.roles);
      this.paginationService.dataSource.paginator = this.paginator;
      this.paginationService.iterator(this.roles);
    });
  }

  public onSubmit(): void {
    const name = (this.rolesFilterForm.value.name !== '') ? this.rolesFilterForm.value.name : null;
    const status = (this.rolesFilterForm.value.status !== '0') ? this.rolesFilterForm.value.status : null;
    this.filterQueryString = this.createFilterQueryParam(name, status);
    this.getRoles();
  }

  public clearFilters(): void {
    this.rolesFilterForm.patchValue({
      name: '',
      status: '0'
    });
    this.getRoles();
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
