import { Component, OnDestroy, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Status } from '../../../models/common/status/status';
import { ActivatedRoute } from '@angular/router';
import { PermissionCreateDto } from '../../../models/cabinet/users/dtos/permission/permission-create-dto';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss']
})
export class PermissionEditComponent implements OnInit, OnDestroy {
  public editPermissionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
  });
  public statuses: Array<Status>;
  public permission: PermissionCreateDto;
  public id: number;
  public unsubscribe$ = new Subject();

  constructor(
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
    this.id = this.route.snapshot.params['id'];
    this.permissionService.getPermissionById(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      if (response) {
        this.permission = response.permission;
        this.fillEditPermissionForm(response.permission);
      }
    });
  }

  public onSubmit(): void {
    const permission: PermissionCreateDto = {
      name: this.editPermissionForm.value.name,
      status: (this.editPermissionForm.value.status === '0') ? this.statuses[0].key : this.editPermissionForm.value.status
    };
    this.permissionService.editPermission(this.id, permission).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      this.handleMessage(response);
    });
  }

  private fillEditPermissionForm(permission: PermissionCreateDto): void {
    this.editPermissionForm.patchValue({name: permission.name, status: permission.status});
  }

  private handleMessage(response: any): void {
    this.translateService.get('close').pipe(takeUntil(this.unsubscribe$)).subscribe((closeText) => {
      if (response.error) {
        this.snackbar.open(response.error, closeText, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'snack-danger'
        });
      } else {
        this.snackbar.open(response.message, closeText, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'snack-success'
        });
        this.redirectService.redirect('/cabinet/permissions', 2000);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
