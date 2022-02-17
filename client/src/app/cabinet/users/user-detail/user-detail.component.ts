import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { UserDetailDto } from "../../../models/cabinet/users/dtos/user/user-detail-dto";
import { MatDialog } from '@angular/material/dialog';
import { WarningConfirmationComponent } from '../../shared/warning-confirmation/warning-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public user: UserDetailDto;
  private id: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
    private translateService: TranslateService
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
      height: '210px',
      data: { message: this.generateWarningMessage() }
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.userService.removeUser(id).subscribe((response) => {
          this.translateService.get('close').subscribe((closeText) => {
            this.snackbar.open(response.message, closeText, {
              duration: 2000,
              verticalPosition: 'top'
            });
            this.redirectService.redirect('/cabinet/users', 2000);
          });
        });
      }
    });
  }

  public unbindSocial(id: string, socialId: string): void {
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '210px',
      data: { message: this.generateWarningMessage('social') }
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.userService.unbindSocial(id, socialId).subscribe((response) => {
          this.translateService.get('close').subscribe((closeText) => {
            this.snackbar.open(response.message, closeText, {
              duration: 2000,
              verticalPosition: 'top'
            });
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

  private generateWarningMessage(type: string = 'user'): string {
    let message = 'Are you sure you want to delete this';
    switch(type) {
      case 'user':
        message = message.concat(' user?');
        if (this.user.socials.length) {
          message = message.concat(' This user contain social connection.');
        }
        break;
      case 'social':
        message = message.concat(' social connection?');
        if (this.user.socials.length === 1) {
          message = message.concat(' User will be deleted.');
        }
        break;
    }
    return message;
  }

}
