import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<User>();
  private user: User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authChange.next({
          userId: user.uid,
          email: user.email
        });
        this.router.navigate(['/bills']);
        this.user = {
          userId: user.uid,
          email: user.email
        };
        console.log(user);
      } else {
        this.user = null;
        this.authChange.next(null);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email, authData.password
    ).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email, authData.password
    ).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}