import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../models/cabinet/users/role';
import { RolesService } from '../../../services/cabinet/roles/roles.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {
  public role: Role;

  constructor(private rolesService: RolesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.rolesService.getRoleById(id).subscribe((response) => {
      this.role = response.role;
      console.log(this.role);
    });
  }

  public removeRole(id: number): void {
    this.rolesService.removeRole(id).subscribe(() => {
      this.router.navigate(['/cabinet/roles']).then();
    });
  }

}
