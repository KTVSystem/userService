import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/cabinet/users/user.servise';
import { User} from '../../models/cabinet/users/user';
import { FormControl, FormGroup } from '@angular/forms';
import { RolesListDto } from '../../models/cabinet/users/dtos/roles-list-dto';
import { Status } from '../../models/common/status/status';
import { statuses } from '../../models/common/status/lists/statuses-list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService } from '../../services/cabinet/shared/pagination/pagination.service';
import { RolesService } from '../../services/cabinet/roles/roles.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/core.state';
import * as fromUser from '../../store/users/users.actions';
import { selectUserItems } from '../../store/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
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
  public unsubscribe$ = new Subject();

  constructor(
    public paginationService: PaginationService,
    private userService: UserService,
    private rolesService: RolesService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.store.select(selectUserItems).subscribe(res => console.log(res));
    this.getUsers();
    this.rolesService.getActiveRoles().pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      this.roles = response;
    });
    this.statuses = statuses;
  }

  private getUsers(): void {
    this.userService.getUsers(this.filterQueryString).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
