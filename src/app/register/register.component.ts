import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { config, validations } from './register-user-form';
import { AuthService } from '../shared/auth.service';
import { ToastService } from '../shared/toast.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  result;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router) {
    this.userForm = this.fb.group(config, validations);
  }

  ngOnInit() {
  }

  register() {
    this.auth.registerUserWithEmailAndPassword(this.userForm.value)
      .then(result => this.router.navigate(['/profile']))
      .catch(error => this.toast.open(error));
  }
}
