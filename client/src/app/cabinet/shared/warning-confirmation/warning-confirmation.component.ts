import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-confirmation',
  templateUrl: './warning-confirmation.component.html',
  styleUrls: ['./warning-confirmation.component.scss']
})
export class WarningConfirmationComponent {
  constructor(
    private dialogRef: MatDialogRef<WarningConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string }
  ) {}

  submit(click: boolean) {
    this.dialogRef.close(click);
  }
}
