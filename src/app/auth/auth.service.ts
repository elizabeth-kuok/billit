import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { BillsService } from '../bills/bills.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private billService: BillsService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authChange.next(true);
        this.router.navigate(['/bills']);
      } else {
        this.billService.cancelSubs();
        this.user = null;
        this.authChange.next(false);
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