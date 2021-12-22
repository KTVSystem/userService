import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Permission } from '../../../models/cabinet/users/permission';

@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss']
})
export class PermissionDetailComponent implements OnInit {
  public permission: Permission;

  constructor(private permissionService: PermissionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.permissionService.getPermissionById(id).subscribe((response) => {
      this.permission = response.permission;
      console.log(this.permission);
    });
  }

  public removePermission(id: number): void {
    this.permissionService.removePermission(id).subscribe(() => {
      this.router.navigate(['/cabinet/permissions']).then();
    });
  }

}
