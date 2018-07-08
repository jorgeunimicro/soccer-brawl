import { Validators } from '@angular/forms';

export const config = {
  email: ['', Validators.compose([Validators.required, Validators.email])],
  password: ['', Validators.required],
};
