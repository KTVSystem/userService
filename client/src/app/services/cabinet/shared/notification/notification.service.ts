import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RedirectService } from '../redirect/redirect.service';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  public unsubscribe$ = new Subject();
  private timeDurationError = 3000;
  private timeDurationSuccess = 2000;
  private position: MatSnackBarVerticalPosition = 'top';

  constructor (
    private translateService: TranslateService,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
  ) {}

  public handleMessage(message: any, type: string, redirectLink: string, redirect = true): void {
    this.translateService.get('close').pipe(takeUntil(this.unsubscribe$)).subscribe((closeText) => {
      if (type === 'error') {
        this.snackbar.open(message, closeText, {
          duration: this.timeDurationError,
          verticalPosition: this.position,
          panelClass: 'snack-danger'
        });
      }
      if (type === 'success') {
        this.snackbar.open(message, closeText, {
          duration: this.timeDurationSuccess,
          verticalPosition: this.position,
          panelClass: 'snack-success'
        });
        if (redirect) {
          this.redirectService.redirect(redirectLink, this.timeDurationSuccess);
        }
      }
    });
  }

  public isInitialized(value: string): boolean {
    return value !== '' && typeof value !== 'undefined';
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
