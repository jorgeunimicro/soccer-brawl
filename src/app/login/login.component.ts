import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { config } from './login-user-form';
import { ToastService } from '../shared/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router) {
    this.userForm = this.fb.group(config);
  }

  ngOnInit() {}

  signIn() {
    this.auth.signIn(this.userForm.value).then(() => this.router.navigate(['/profile']))
      .catch(error => this.toast.open(error));
  }
}
