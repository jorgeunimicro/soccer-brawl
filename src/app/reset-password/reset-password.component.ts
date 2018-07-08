import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ToastService } from '../shared/toast.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  emailControl = new FormControl('');
  isEmailSend = false;
  constructor(
    private auth: AuthService,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit() {}

  sendEmail() {
    this.auth.sendResetPasswordEmail(this.emailControl.value)
      .then(() => {
        this.toast.open('Reset password sent to ' + this.emailControl.value);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 500);
      })
      .catch(error => this.toast.open(error));
  }
}
