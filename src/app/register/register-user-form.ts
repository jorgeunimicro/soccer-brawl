import { AbstractControl, Validators } from '@angular/forms';

const MatchPassword = (c: AbstractControl):{[key: string]: any} => {
  const password = c.get('password').value;
  const matchPassword = c.get('matchPassword').value;
  if (password !== matchPassword) {
    c.get('matchPassword').setErrors({'matchPassword': true});
    return;
  }
  return null;
};

export const config = {
  name: ['', Validators.required],
  email: ['', Validators.compose([Validators.required, Validators.email])],
  password: ['', Validators.required],
  matchPassword: ['', Validators.compose([Validators.required])]
}

export const validations = {
  validator: MatchPassword
};
