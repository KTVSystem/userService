import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { MatDialog } from '@angular/material/dialog';
import { WarningConfirmationComponent } from '../../shared/warning-confirmation/warning-confirmation.component';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { deleteUser, selectUserItem, unbindSocialUser } from '../../../store/users';
import { User } from '../../../models/cabinet/users/user';
import { UserDetailDto } from '../../../models/cabinet/users/dtos/user/user-detail-dto';
import * as fromUser from '../../../store/users/users.actions';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  public user: UserDetailDto;
  public id: string;
  public unsubscribe$ = new Subject();
  public userGlobalMessage: string;
  public socialGlobalMessage: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private store: Store<fromRoot.State>,
    private notificationService: NotificationService,
    private actions$: Actions<any>,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUser();
  }

  public getUser(): void {
    this.store.select(selectUserItem({id: this.id})).pipe(takeUntil(this.unsubscribe$)).subscribe((response: User | undefined) => {
      this.user = response as UserDetailDto;
    });
  }

  public removeUser(id: string): void {
    this.generateWarningMessage();
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '210px',
      data: { message: this.userGlobalMessage }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((dialogResult) => {
      if (dialogResult) {
        this.translateService.get('removedUserSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
          this.store.dispatch(deleteUser({ userId: id, apiMessage: text }));
        });
        this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
          if (this.notificationService.isInitialized(action.apiMessage)) {
            this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/users');
          }
        });
      }
    });
  }

  public unbindSocial(id: string, socialId: string): void {
    this.generateWarningMessage();
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '210px',
      data: { message: this.socialGlobalMessage }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((dialogResult) => {
      if (dialogResult) {
        this.translateService.get(['unbindUserSocialSuccess', 'removedUserSuccess']).pipe(takeUntil(this.unsubscribe$)).subscribe((textArray) => {
          this.store.dispatch(unbindSocialUser({ id: id, socialId: socialId, apiMessage: textArray}));
        });
        const redirect: boolean = this.user?.socials?.length === 1;
        this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
          if (this.notificationService.isInitialized(action.apiMessage)) {
            this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/users', redirect);
          }
        });
        this.store.dispatch(new fromUser.LoadUsers());
      }
    });
  }

  private generateWarningMessage(): void {
    this.translateService.get(['areYouSureToDelete', 'userPlus', 'thisUserContain', 'socialConnection', 'userWillBeDeleted'])
      .pipe(takeUntil(this.unsubscribe$)).subscribe((textArray) => {
        const baseMessage = textArray.areYouSureToDelete;
        this.userGlobalMessage = baseMessage.concat(textArray.userPlus);
        if (this.user?.socials?.length) {
          this.userGlobalMessage = this.userGlobalMessage.concat(textArray.thisUserContain);
        }
        this.socialGlobalMessage = baseMessage.concat(textArray.socialConnection);
        if (this.user?.socials?.length === 1) {
          this.socialGlobalMessage = this.socialGlobalMessage.concat(textArray.userWillBeDeleted);
        }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
