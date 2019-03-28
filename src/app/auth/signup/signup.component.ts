import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isPasswordMatch: boolean;
  matchTimeout: number;
  ngOnInit() {

  }

  onInputRepeat(pw, rep) {
    console.log(pw, rep);
    window.clearTimeout(this.matchTimeout);
    this.matchTimeout = window.setTimeout((first, second) => {
      this.isPasswordMatch = first === second;
    }, 1000, pw, rep)
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    console.log(form.value);
    this.authService.registerUser({email, password});
  }

}
