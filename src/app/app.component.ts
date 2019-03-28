import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BillsService } from './bills/bills.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private billService: BillsService
  ) {}

  ngOnInit() {
    this.authService.initAuthListener();
    this.billService.init();
  }
}
