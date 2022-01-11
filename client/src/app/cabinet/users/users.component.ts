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
  public usersSource: MatTableDataSource<User>;
  public pageSize = 5;
  public currentPage = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.roles = roles;
    this.statuses = statuses;
  }

  private getUsers(): void {
    this.userService.getUsers(this.filterQueryString).subscribe((response) => {
      this.users = response.users;
      this.usersSource = new MatTableDataSource<User>(response.users);
      this.usersSource.paginator = this.paginator;
      this.iterator();
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const usersPart = this.users.slice(start, end);
    this.usersSource = new MatTableDataSource<User>(usersPart);
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
