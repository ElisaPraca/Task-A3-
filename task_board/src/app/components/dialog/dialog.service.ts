
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from './dialog.component';
import { enumDialogType } from '../../enums/enum-dialog-type';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  getDialog(
    enumDialogType: enumDialogType,
    message: string,
    devePermanecerAberto: boolean = false
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { message, enumDialogType },
      disableClose: devePermanecerAberto,
    });
    return dialogRef.afterClosed();
  }

  /**
   * Retorna um dialog que recebe dados para serem recuperados
   * @param dialogComponent componente que receberá os dados enviados
   * @param data dado a receber no componete informado
   * @param devePermanecerAberto se deve permanecer aberto
   * @returns Observable<boolean>
   */
  getDialogEspecifico(
    dialogComponent: any,
    data: any,
    devePermanecerAberto: boolean = false
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(dialogComponent, {
      data: { data },
      disableClose: devePermanecerAberto,
    });
    return dialogRef.afterClosed();
  }

  close(): void {
    this.dialog.closeAll();
  }
}
