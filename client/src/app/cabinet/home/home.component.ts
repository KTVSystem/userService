import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/cabinet/users/user';
import { Role } from '../../models/cabinet/users/role';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store} from '@ngrx/store';
import * as fromRoot from '../../store/core.state';
import { selectUserItems } from '../../store/users';
import { selectRolesItems } from '../../store/roles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public users: Array<User> = [];
  public roles: Array<Role> = [];
  public userCount: number;
  public rolesCount: Map<string, number> = new Map();
  public unsubscribe$ = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.store.select(selectUserItems).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      if (response.users && response.users.length) {
        this.users = response.users;
        this.userCount = response.users.length;
        this.store.select(selectRolesItems).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
          this.roles = response.roles;
          this.setRolesCount();
        });
      }
    });
  }

  private setRolesCount(): void {
    this.roles.forEach((role) => {
      const usersByRole = this.users.filter(user => user.role.name === role.name);
      this.rolesCount.set(role.name, usersByRole.length);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
