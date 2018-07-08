import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class ToastService {

  constructor(public snackBar: MatSnackBar) {}

  open(message: string|null) {
    const options = {
      duration: 2000
    };
    this.snackBar.open(message, null, <MatSnackBarConfig>options);
  }

}
