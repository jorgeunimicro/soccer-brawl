import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

interface UserCredentials {
  name: string;
  password: string;
  email: string;
}

interface LoginData {
  password: string;
  email: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => user ?  Observable.of(user) : Observable.of(null))
    );
  }

  registerUserWithEmailAndPassword(user: UserCredentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(() => this.afAuth.auth.currentUser.updateProfile({ displayName: user.name, photoURL: null}));
  }

  signIn(user: LoginData) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.afAuth.authState.subscribe(user  => {
        console.log(user);
      });
      this.router.navigate(['/login']);
    });
  }

  sendResetPasswordEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  sendVerificationCode(password: string, code: string) {
    return this.afAuth.auth.confirmPasswordReset(code, password);
  }
}
