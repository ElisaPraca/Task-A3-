import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { enumDialogType } from '../../enums/enum-dialog-type';

export interface DialogResult {
  confirmed: boolean;
}
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string; enumDialogType: enumDialogType }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  isConfirma(): boolean {
    return this.data.enumDialogType == enumDialogType.CONFIRM;
  }

  getColorButton(type: enumDialogType): string {
    switch (type) {
      case enumDialogType.SUCCESS:
        return 'accent';
      case enumDialogType.CONFIRM:
        return 'primary';
      case enumDialogType.ALERT || enumDialogType.WARN:
        return 'warn';
      default:
        return '';
    }
  }

  getTitle(type: enumDialogType): string {
    switch (type) {
      case enumDialogType.SUCCESS:
        return 'Concluído';
      case enumDialogType.CONFIRM:
        return 'Confirmar';
      case enumDialogType.ALERT:
        return 'Alerta';
      case enumDialogType.WARN:
        return 'Erro';
      case enumDialogType.INFO:
        return 'Informação';
      default:
        return '';
    }
  }
}