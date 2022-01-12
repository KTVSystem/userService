import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { UserDetailDto } from "../../../models/cabinet/users/dtos/user/user-detail-dto";
import { MatDialog } from '@angular/material/dialog';
import { WarningConfirmationComponent } from '../../shared/warning-confirmation/warning-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public user: UserDetailDto;
  private message: string  = 'Are you sure you want to delete this user?';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe((response) => {
      this.user = response.user;
    });
  }

  public removeUser(id: number): void {
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '200px',
      data: { message: this.message }
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.userService.removeUser(id).subscribe(() => {
          this.snackbar.open('User was deleted!', 'Close', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.redirectService.redirect('/cabinet/users', 2000);
        });
      }
    });
  }

}
