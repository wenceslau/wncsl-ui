import { Injectable } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  isLoadingResults = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  duration: number = (5 * 1000);

  constructor(private snackBar: MatSnackBar) {
  }

  getError(err: any): string {
    console.log(err)
    let errorMessage;

    errorMessage = err?.error?.exception
    if (errorMessage)
      return err?.error?.message;

    errorMessage = err?.error?.error;
    if (errorMessage)
      return errorMessage;

    errorMessage = err?.message
    if (errorMessage)
      return errorMessage;

    return JSON.stringify(err);
  }

  throwError(err: any) {
    this.addSnackBarError(this.getError(err))
  }

  addSnackBarError(message: string) {
    this.snackBar.open(message, ":( Ops", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'main-snackbar-error',
      duration: this.duration
    });
  }

  addSnackBarInfo(message: string) {
    this.snackBar.open(message, ":) OK", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'main-snackbar-info',
      duration: this.duration
    });
  }

  loading() {
    this.isLoadingResults = !this.isLoadingResults;
  }
}
