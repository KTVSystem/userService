import { Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../../services/cabinet/users/user.servise';
import { User} from '../../models/cabinet/users/user';
import { FormControl, FormGroup } from '@angular/forms';
import { RolesListDto } from '../../models/cabinet/users/dtos/roles-list-dto';
import { Status } from '../../models/common/status/status';
import { roles } from '../../models/cabinet/users/lists/roles-list';
import { statuses } from '../../models/common/status/lists/statuses-list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService } from '../../services/cabinet/shared/pagination/pagination.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<User> = [];
  public roles: Array<RolesListDto>;
  public statuses: Array<Status>;
  public usersFilterForm = new FormGroup({
    email: new FormControl(''),
    role: new FormControl('0'),
    status: new FormControl('0'),
  });
  public filterQueryString: string = '';
  displayedColumns: string[] = ['email', 'role', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public paginationService: PaginationService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.roles = roles;
    this.statuses = statuses;
  }

  private getUsers(): void {
    this.userService.getUsers(this.filterQueryString).subscribe((response) => {
      this.users = response.users;
      this.paginationService.dataSource = new MatTableDataSource<any>(response.users);
      this.paginationService.dataSource.paginator = this.paginator;
      this.paginationService.iterator(this.users);
    });
  }

  public onSubmit(): void {
    const email = (this.usersFilterForm.value.email !== '') ? this.usersFilterForm.value.email : null;
    const role = (this.usersFilterForm.value.role !== '0') ? this.usersFilterForm.value.role : null;
    const status = (this.usersFilterForm.value.status !== '0') ? this.usersFilterForm.value.status : null;
    this.filterQueryString = this.createFilterQueryParam(email, role, status);
    this.getUsers();
  }

  public clearFilters(): void {
    this.usersFilterForm.patchValue({
      email: '',
      role: '0',
      status: '0'
    });
    this.getUsers();
  }

  private createFilterQueryParam(email: string, role: string, status: string): string {
    let filterString = '';
    filterString = (email) ? filterString + 'email=' + email + '&' : filterString;
    filterString = (role) ? filterString + 'role=' + role + '&' : filterString;
    filterString = (status) ? filterString + 'status=' + status + '&' : filterString;
    filterString = (filterString !== '') ? '?' + filterString : filterString;
    filterString = (filterString !== '') ? filterString.substr(0, filterString.length - 1) : filterString;
    return filterString;
  }

}
