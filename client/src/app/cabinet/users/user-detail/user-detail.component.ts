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
  private messageDeleteUser: string  = 'Are you sure you want to delete this user?';
  private id: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUser();
  }

  public getUser(): void {
    this.userService.getUserById(this.id).subscribe((response) => {
      this.user = response.user;
      console.log(this.user);
    });
  }

  public removeUser(id: string): void {
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '200px',
      data: { message: this.messageDeleteUser }
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.userService.removeUser(id).subscribe((response) => {
          this.snackbar.open(response.message, 'Close', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.redirectService.redirect('/cabinet/users', 2000);
        });
      }
    });
  }

  public unbindSocial(id: string, socialId: string): void {
    const message = this.user.socials.length === 1 ? 'Are you sure you want to unbind this social account. User will be deleted?'
      : 'Are you sure you want to unbind this social account?';
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '210px',
      data: { message: message }
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.userService.unbindSocial(id, socialId).subscribe((response) => {
          this.snackbar.open(response.message, 'Close', {
            duration: 2000,
            verticalPosition: 'top'
          });
          if (this.user.socials.length === 1) {
            this.redirectService.redirect('/cabinet/users', 3000);
          } else {
            this.getUser();
          }
        });
      }
    });
  }

}
