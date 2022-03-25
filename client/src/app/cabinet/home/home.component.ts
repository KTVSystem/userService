import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/cabinet/users/user.servise';
import { User } from '../../models/cabinet/users/user';
import { RolesService } from '../../services/cabinet/roles/roles.service';
import { Role } from '../../models/cabinet/users/role';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(private userService: UserService, private rolesService: RolesService) { }

  ngOnInit(): void {
    this.userService.getUsers().pipe(takeUntil(this.unsubscribe$)).subscribe((resUsers) => {
      if (resUsers.users && resUsers.users.length) {
        this.rolesService.getRoles().subscribe((resRoles) => {
          this.users = resUsers.users;
          this.roles = resRoles.roles;
          this.userCount = resUsers.users.length;
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
