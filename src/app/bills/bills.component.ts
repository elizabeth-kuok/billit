import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bill, Account } from './bill.model';
import { BillsService } from './bills.service';
@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html',
    styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit, OnDestroy {
    bills: Bill[];
    billsSubscription: Subscription;
    accounts: Account[];
    accountsSub: Subscription;
    
    constructor(private billsService: BillsService) { }

    ngOnInit() {
        this.billsSubscription = this.billsService.billsChanged
            .subscribe(bills => {
                this.bills = bills;
            });
        this.billsService.fetchBills();
        this.accountsSub = this.billsService.accountsChanged
            .subscribe(accts => {
                this.accounts = accts;
            });
        this.billsService.fetchAccounts();
    }

    ngOnDestroy() {
        this.billsSubscription.unsubscribe();
        this.accountsSub.unsubscribe();
    }
}